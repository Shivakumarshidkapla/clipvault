Docker Notes - Build Context, Layer Caching & .dockerignore
Q1. Why do professional Dockerfiles copy package.json before copying the application source code?

Answer:

Professional Dockerfiles first copy package.json (and package-lock.json) before copying the rest of the source code to take advantage of Docker Layer Caching. Docker caches each instruction as a separate layer. Since application source code changes frequently but dependencies change less often, copying the dependency files first allows Docker to reuse the cached npm install layer. If only the source code changes, Docker rebuilds only the later layers, making the build much faster. If the entire project is copied before running npm install, every source code change invalidates the cache, causing Docker to reinstall all dependencies unnecessarily.

Q2. Why is COPY . . placed after RUN npm install?

Answer:

COPY . . is intentionally placed after RUN npm install so that changes in the application source code do not invalidate the dependency installation layer. Docker rebuilds layers from the first changed instruction onward. By copying only package.json first, Docker can reuse the cached dependency layer and only copy the updated application files. This significantly reduces build time during development.

Q3. What happens if we write the Dockerfile like this?
COPY . .
RUN npm install

Answer:

The application will still work correctly, but Docker loses the benefit of layer caching. Since COPY . . copies the entire project, any small modification to the source code changes that layer. Docker considers everything after that instruction invalid and executes npm install again, even if package.json has not changed. This results in slower image builds and unnecessary package installation.

Q4. What is the purpose of .dockerignore?.

Answer:

The .dockerignore file prevents unnecessary files and directories from being included in the Docker build context. Before Docker starts building an image, it sends the entire project directory to the Docker daemon. Without a .dockerignore file, unnecessary files such as virtual environments, Git history, cache directories, log files, and build artifacts are also transferred. Ignoring these files reduces build time, reduces the amount of data sent to Docker, and prevents unwanted files from being copied into the final image.

Q5. Why do we ignore .venv in .dockerignore?

Answer:

The .venv directory contains the Python virtual environment created on the developer's local machine. Docker containers already provide process and dependency isolation, so a virtual environment is not required inside the container. Instead, the Docker image starts from a clean Python base image and installs the required dependencies directly using pip install. Copying the local virtual environment into the container would also copy operating-system-specific binaries (such as macOS binaries) into a Linux container, which can cause compatibility issues.

Q6. Why do we ignore node_modules in the frontend?

Answer:

The node_modules directory contains all installed JavaScript packages from the developer's local machine. During the Docker build, the container installs its own Linux-compatible dependencies using npm install. If the local node_modules directory is copied into the image, it may overwrite the Linux-installed dependencies with macOS or Windows versions. This can lead to platform incompatibilities, especially for packages containing native binaries. Ignoring node_modules ensures that the container only uses the dependencies it installed itself.

Q7. Why didn't our application fail yesterday even though node_modules wasn't ignored?

Answer:

Although the local node_modules directory was copied into the Docker image, the application continued to work because most of the project's dependencies (such as React, Vite and TypeScript) are written entirely in JavaScript and are platform-independent. Pure JavaScript packages work on both macOS and Linux. However, if the project had used packages containing native compiled binaries (such as bcrypt, sharp, or sqlite3), copying the host's node_modules into the Linux container could have caused runtime failures due to incompatible binaries.

Q8. What actually happens during docker build before the Dockerfile is executed?

Answer:

Before executing the Dockerfile, Docker first creates a build context by collecting all files from the project directory, excluding any files listed in .dockerignore. This build context is then sent to the Docker daemon. Only after the build context has been transferred does Docker begin executing the Dockerfile instructions (FROM, COPY, RUN, etc.). Therefore, reducing the size of the build context using .dockerignore improves build performance.

Q9. Does .dockerignore reduce the final Docker image size?

Answer:

Not always. The primary purpose of .dockerignore is to reduce the size of the build context and prevent unnecessary files from being sent to the Docker daemon. The final image size only increases if those unnecessary files are actually copied into the image using instructions such as COPY . .. Therefore, .dockerignore mainly improves build performance and also helps prevent accidental inclusion of unwanted files in the final image.

Q10. What is the difference between the build context and the Docker image?

Answer:

The build context is the collection of files that Docker receives from the host machine before starting the build process. The Docker image is the final result created after executing all Dockerfile instructions. Files that exist in the build context are not automatically included in the image; they are only added if a Dockerfile instruction such as COPY or ADD explicitly copies them into the image.

I actually like this format much better than simple bullet points. By the end of ClipVault, you'll have a DevOps Interview Handbook where every topic is written as a question followed by an explanation. That makes it much easier to revise before interviews because you're practising the exact style in which interviewers usually ask technical questions.

Q: Why do we use a multi-stage Docker build for the React frontend?

Answer:

A multi-stage Docker build separates the build environment from the runtime environment. The first stage uses a Node.js image to install dependencies and compile the React application into static files using npm run build. Once the dist folder is generated, Node.js and the source code are no longer required. The second stage starts from a clean Nginx image and copies only the dist folder from the builder stage. This results in a much smaller, more secure, and production-ready image because it contains only the static assets and the web server needed to serve them.

Interview Question ⭐⭐⭐⭐

Interviewer:

You have a React application. During development, you run it using npm run dev, but in production you use npm run build and serve the dist folder with Nginx. Why do we switch from Node.js to Nginx in production? Explain the complete flow.

Model Answer

During development, I use npm run dev, which starts the Vite development server. The Vite server watches my source files, compiles JSX and TypeScript on the fly, provides Hot Module Replacement (HMR), and serves the application for rapid development.

Before deploying to production, I run npm run build. This compiles the React application into optimized static assets, including HTML, CSS, and JavaScript, which are stored in the dist folder. At this stage, the React source code no longer needs to be compiled because everything has already been transformed into files that a browser can understand.

Since the application is now just static files, there is no need to keep Node.js or the Vite development server running. Instead, I use Nginx because it is specifically designed to serve static content efficiently. Nginx has a smaller footprint, uses fewer resources, provides better performance, and reduces the attack surface by excluding development tools such as Node.js, npm, source code, and development dependencies.

In my Docker setup, I use a multi-stage build. The first stage uses Node.js to install dependencies and build the React application, while the second stage uses a clean Nginx image and copies only the generated dist folder. This produces a smaller, more secure, and production-ready Docker image.

Q. Why do we use AS builder in a multi-stage Dockerfile?

Answer:

The AS builder instruction assigns a name (alias) to the build stage. This alias allows later stages to reference files from that stage using COPY --from=builder. Instead of copying the entire filesystem, Docker copies only the required files (such as the dist folder) into the final image. Although Docker also allows stages to be referenced by their numeric index (for example, --from=0), using an alias makes the Dockerfile more readable and easier to maintain, especially when additional build stages are added in the future.

Interviewer:

Your development Docker image is 447 MB, but after implementing a multi-stage build your production image became only 62 MB. Why?

Model Answer

The development image contains everything required for development, including Node.js, npm, source code, development dependencies, and the Vite development server. In a multi-stage build, the first stage uses Node.js only to install dependencies and build the React application into static files. The second stage starts from a clean Nginx image and copies only the generated dist folder. The builder stage is discarded after the build, so the final image contains only Nginx and the static assets. This significantly reduces the image size, improves deployment speed, and reduces the attack surface.

Q. Why do we define CMD in the Dockerfile and command in Docker Compose?

Answer:

The CMD instruction in a Dockerfile defines the default command that will run when a container starts. If a container is started using docker run, Docker executes this default command. However, Docker Compose allows the command field to override the Dockerfile's CMD. This is useful because the same image can be used in different environments. In development, Docker Compose overrides the command to start Uvicorn with the --reload option for automatic code reloading. In production, no override is provided, so Docker executes the default CMD from the Dockerfile, starting the application without development-specific options. This keeps the Docker image production-ready while allowing different runtime behaviour during development.



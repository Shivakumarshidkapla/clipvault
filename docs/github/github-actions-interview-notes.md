What is the purpose of a Git tag?
Answer

A Git tag is a permanent reference to a specific commit in the repository. Unlike branches, which move forward as new commits are added, a tag always points to the same commit. Tags are commonly used to mark releases such as v1.0.0 or v2.0.0, making it easy to identify, deploy, or roll back to a stable version of the application. In modern CI/CD pipelines, Git tags are often used to trigger release workflows and version Docker images, ensuring that the source code, Docker image, and deployed application all correspond to the same version.


Q. What is GitHub Actions?

Answer:

GitHub Actions is GitHub's built-in CI/CD platform. It automates software development workflows in response to events such as code pushes, pull requests, or release tags. A workflow is defined in a YAML file under .github/workflows. When triggered, GitHub provisions a temporary runner, executes the defined jobs and steps, and reports the results. Common uses include building applications, running tests, creating Docker images, and deploying software.

Q. What are GitHub Secrets?

Answer:

GitHub Secrets are encrypted values stored at the repository or organization level. They are used to securely provide sensitive information, such as API keys, access tokens, and credentials, to GitHub Actions workflows. Secrets are injected into the workflow only at runtime and are not stored in the repository or exposed in workflow logs.

Q. What is a GitHub Action?

Answer:

A GitHub Action is a reusable automation component that performs a specific task within a GitHub Actions workflow. Actions can be created by GitHub, third parties, or your own team, and are referenced in workflow steps using the uses keyword. Examples include checking out source code, logging in to Docker Hub, building Docker images, or deploying applications.

What is the purpose of runs-on in GitHub Actions?

Answer:

The runs-on keyword specifies the type of runner that executes a job. GitHub provisions a temporary virtual machine matching the requested environment (such as ubuntu-latest, windows-latest, or macos-latest), runs the workflow steps, and then discards the machine after the job completes.

Interview Question ⭐⭐⭐⭐⭐
Q. Why is actions/checkout usually the first step in a GitHub Actions workflow?
Answer

actions/checkout downloads the repository's source code onto the GitHub Actions runner. Since each runner starts as a clean virtual machine without the project's files, checking out the repository is typically the first step so that subsequent steps—such as building, testing, or packaging the application—have access to the source code.


What is Docker Buildx?

Answer:

Docker Buildx is Docker's extended build tool that provides advanced image-building capabilities beyond the traditional docker build command. It supports features such as multi-platform builds, improved build caching, and integration with BuildKit. In GitHub Actions, it is commonly configured before building and pushing Docker images.

Interview Question ⭐⭐⭐⭐⭐
Q. Why are GitHub Secrets used for Docker Hub login?

Answer:

GitHub Secrets securely store sensitive values such as usernames, access tokens, and API keys. During a workflow run, GitHub injects these values into the runner without exposing them in the repository. This allows workflows to authenticate with external services like Docker Hub while keeping credentials secure.

Q. What's the difference between configuration and secrets?

Answer:

Configuration consists of application settings that define how software behaves, such as ports, log levels, or hostnames. Secrets are sensitive configuration values—such as passwords, API keys, and access tokens—that must be protected from unauthorized access. While configuration may be stored in configuration files or environment variables, secrets should be stored in a secure secret management solution like GitHub Secrets, AWS Secrets Manager, or HashiCorp Vault and injected into the application or workflow at runtime.

What is the difference between context and file in a Docker build?

Answer:

context specifies the directory whose contents are sent to Docker during the build. It determines which files are available to COPY and ADD instructions in the Dockerfile.
file specifies which Dockerfile Docker should use for the build. It allows you to use a Dockerfile with a custom name or location, such as Dockerfile.prod.
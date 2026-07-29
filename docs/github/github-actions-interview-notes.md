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
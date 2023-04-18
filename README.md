# Senior's Journey – Retirement Hub

The Senior's Journey Retirement Hub is an innovative and user-friendly platform designed to assist seniors and
near-seniors in their retirement planning and engagement with available retirement benefits.

Our first release offers a comprehensive collection of learning content that provides valuable information about
retirement planning and available benefits. The content is curated to help the public understand the benefits they are
eligible for and how to access them. Additionally, we are launching a retirement planning quiz that can be completed by
the public. Upon completion, the quiz provides a checklist of tasks that users should consider for their retirement
planning needs. The platform is user-friendly, intuitive, and accessible for seniors of all skill levels. Our team is
dedicated to providing an exceptional user experience and enhanced support to ensure that our users have the best
possible experience using our platform.

## Modules

This repository contains three main modules:

- the `frontend` module contains an application built using Next.js
- the `gitops` module contains Kubernetes manifests that describe the state of our Kubernetes cluster's dev, test, and
  production environments
- the `infrastructure` module contains a Terragrunt project that deploys infrastructure-as-code OAuth clients for Azure
  Active Directory

### `frontend`

The `frontend` module contains a Next.js application that serves as our frontend. The purpose of this application is to
provide a user interface for our customers to interact with our platform. To start the application, simply run `npm run
dev`.

### `gitops`

The `gitops` module contains a description of our Kubernetes cluster's state. This state is divided into dev, test, and
(eventually) production environments, each with its own set of YAML files containing the desired state. To make changes
to any of these environments, simply edit the appropriate YAML file and submit a pull request. Once approved, our
TeamCity pipelines will automatically deploy the changes to the target environment.

### `infrastructure`

The `Infrastructure` module contains a Terragrunt project that deploys OAuth clients for Azure Active Directory. We use
this to protect our nonprod environments and provide secure access to our platform. This project includes a
terragrunt.hcl file that defines the infrastructure, as well as various subfolders containing necessary configuration
files. To deploy the infrastructure, simply run `terragrunt apply` in the target environment folder.

## License

Senior's Journey – Retirement Hub is open source and licensed under the MIT license.

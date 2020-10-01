# NIAID Design System (NDS)

The NIAID Design System was developed within the Office of Communications and Government Relations (OCGR) at the National Institute of Allergy and Infectious Diseases (NIAID) by Booz Allen Hamilton. The design system is designed to aid users with the process of creating policy-compliant websites that conform to design standards and guidance set by NIAID, NIH, HHS, and USWDS. This Readme details the steps needed to service and maintin both NDS and its accompanying documentation site.

This repository houses the source code for:
* The NIAID Design System: The code that NDS components use to function including CSS, JS, Twig, as well as third-party library assets (CSS, JS)
* The NDS Documentation Site: The public website used for documenting NDS design principles, development setup, and public access point for downloading NDS assets.
* The NDS Drupal Theme: The official Drupal Theme source files that runs on NDS.
* Theme Builder: A tool used to show how the various design configuration options of NDS look on sample pages, hosted on the NDS Documentation Site.

Current Sites Running on NDS:
* NIAID Digital Policy Website
* Coronavirus Prevention Network (CoVPN)
* ECM @ NIH
* NDS Documentation Site

## Repo Organization

* global-assets: The source directory for NDS and its components. The directory is also a Pattern Lab instance.
* nds-drupal-theme-master: The official Drupal Theme source files that runs on NDS.
* niaid-design-system: The source directroy for the files used for the NDS documentation website.

## Getting Started

### Prerequisites

You will need the following installed on your local machine:

* Node.js
* NPM
* PHP
* Composer

### Installing

To maintain the documentation site, move into the ./niaid-design-system directory.

```
cd niaid-design-system/
```

Install Node Modules

```
npm i
```

Install Composer Modules for Pattern Lab

```
composer install
```

## Running the Project

To view the site in a locally-hosted sandbox, run 'gulp.' This will open a localhost url with the project running.

```
gulp
```

Navigate to the site pages using the Pages dropdown at the top.

### Maintaining NDS

All changes to the global NDS system (components, global CSS, JS, etc.) occur within the ./global-assets directory. This directory is responsible for housing the entirety NDS in its release form. The NDS global assets for the documentation site live in the ./niaid-design-system/source/_patterns/00-nds/ directory. This directory gets automatically update from the components in the ./global-assets directory. If changes need to occur to official NDS components, make those changes in the ./global-assets directory. If changes to the documentation site-specific components are needed, make the changes in ./niaid-design-system/source/_patterns/ (with the exception of 00-nds/).

## Creating a Production Build

The public_html directory within ./niaid-design-system is where the final upload-ready files will be generated. To create a production build, run the following in the ./niaid-design-system directory:

```
gulp buildProd
```

## Deploying the Site

To make a production build, run the make deploy command. This will compile the project, move assets into the public_html directory, and deploy the contents of the directory to the AWS S3 bucket.

```
make deploy
```

## Built With

* [Pattern Lab](https://patternlab.io/) - Atomic Design System
* [Bootstrap](https://getbootstrap.com/) - Grid System Framework

## Developers

* **Jacob Caccamo** - Creator, Front-End Developer
* Roshana Devkota - Drupal Developer
* Souley Coulibaly - DevOps SME
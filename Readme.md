# NIAID Design System (NDS)

The NIAID Design System was developed within the Office of Communications and Government Relations (OCGR) at the National Institute of Allergy and Infectious Diseases (NIAID) by Booz Allen Hamilton. The design system is designed to aid users with the process of creating policy-compliant websites that conform to design standards and guidance set by NIAID, NIH, HHS, and USWDS. This Readme details the steps needed to service and maintin both NDS and its accompanying documentation site.

This repository houses the source code for:
* The NIAID Design System: The code that NDS components use to function including CSS, JS, Twig, as well as third-party library assets (CSS, JS).
* The NDS Documentation Site: The public website used for documenting NDS design principles, development setup, and public access point for downloading NDS assets.
* The NDS Drupal Theme: The official Drupal Theme source files that runs on NDS.
* Theme Builder: A tool used to show how the various design configuration options of NDS look on sample pages, hosted on the NDS Documentation Site.

Current Sites Running on NDS:
* NIAID Digital Policy Website
* [Coronavirus Prevention Network (CoVPN)](https://coronaviruspreventionnetwork.org)
* [ECM @ NIH](https://ecm.nih.gov/)
* [NDS Documentation Site](http://ids-theme-builder.niaid.nih.gov.s3-website-us-east-1.amazonaws.com/)

## Repo Organization

* global-assets: The source directory for NDS and its components. The directory is also a Pattern Lab instance.
* nds-documentation-site: The source directory for the files used for the NDS documentation website.
* nds-drupal-theme-master: The official Drupal Theme source files that runs on NDS.

## Getting Started

### Prerequisites

You will need the following installed on your local machine:

* Node.js
* NPM
* PHP
* Composer

### Installing

To maintain the documentation site, move into the ./nds-documentation-site directory.

```
cd nds-documentation-site/
```

Install Node Modules

```
npm i
```

Install Composer Modules for Pattern Lab

```
composer install
```
If prompted to install a theme, type "n" and hit enter.

## Running the Project

To view the site in a locally-hosted sandbox, run 'gulp' from within ./nds-documentation-site. This will open a localhost url with the project running.

```
gulp
```

Navigate to the site pages using the Pages dropdown at the top.

### Maintaining NDS

All of the official, supported components, stylesheets, and scripts live in the ./global-assets directory. When the official components or other assets need updating, the changes occur within this directory.

The global components, stylesheets, and scripts from ./global-assets get pulled into ./nds-documentation-site (the documentation site) and ./nds-drupal-theme via Gulp. Both the documentation site and the Drupal Theme get updated with these assets when gulp is run from within the ./nds-documentation-site directory, so the global assets in these locations do not need to be manually updated. The global assets that are pulled into each directory live in gitignored folders, thus, changes to these files must occur in the ./global-assets folder. To ensure that outdated files are not hiding in folders, you may delete the following folders prior to running "gulp":

#### ./nds-documentation-site
* source/_patterns/00-nds/
* source/css/global/
* source/css/libraries/
* source/js/global/
* source/js/libraries/
* source/images/global/

#### ./nds-drupal-theme
* nds/

Changes to the documentation site or the Drupal Theme specific files may occur and should happen in the approriate directory. 

## Creating a Production Build

The public_html directory within ./nds-documentation-site is where the final, upload-ready files will be generated. To create a production build, run the following in the ./nds-documentation-site directory:

```
gulp buildProd
```

## Deploying the Site

To make a production build and deploy it, run the make deploy command. This will compile the project, move assets into the public_html directory, and deploy the contents of the directory to the AWS S3 bucket. You must be connected to BAH AWS SAML.

```
make deploy
```

Specific Events that Occur:
* Pattern Lab gets compiled and production assets are moved into public_html.
* A copy of the contents of ./global-assets gets moved into a dist directory and zipped. This zip file is then moved into public_html. This is the official Pattern Lab-only version of NDS (The format for generating static sites).
* NDS gets pulled into ./nds-drupal-theme, then a copy of the contents of ./nds-drupal-theme get zipped and moved into public_html. This is the official source code for the NDS Drupal Theme.

## Built With

* [Pattern Lab](https://patternlab.io/) - Atomic Design System
* [Bootstrap 4](https://getbootstrap.com/) - Grid System Framework
* [Gulp](https://gulpjs.com/) - JS-Based Task Manager

## Developers

* **Jacob Caccamo** - Creator, Front-End Developer
* Roshana Devkota - Drupal Developer
* Souley Coulibaly - DevOps SME
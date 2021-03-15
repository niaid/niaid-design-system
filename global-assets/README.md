# NIAID Design System (NDS)

The NIAID Design System was developed within the Office of Communications and Government Relations (OCGR) at the National Institute of Allergy and Infectious Diseases (NIAID) by Booz Allen Hamilton. The design system is designed to aid users with the process of creating policy-compliant websites that conform to design standards and guidance set by NIAID, NIH, HHS, and USWDS. Please see the [NIAID Design System documentation site](http://ids-theme-builder.niaid.nih.gov.s3-website-us-east-1.amazonaws.com/) for detailed information on how to get started.

## Prerequisites

You will need the following installed on your local machine:

* Node.js
* NPM
* PHP
* Composer

## Installing

Change into the root of your project folder.

```
cd [YOUR_PROJECT_NAME]/
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

To view the site in a locally-hosted sandbox, run 'gulp' in the project root. This will open a localhost url with the project running.

```
gulp
```

Navigate to the site pages using the Pages dropdown at the top.

## Building NDS for Production

NDS provides a way to quickly build a distribution folder with all the necessary, web-ready assets. Upon build, the assets get generated and placed into a public_html/ directory.

1. Create a Distribution Pattern Folder.
Start by creating a 06-dist/ folder under _patterns/ (source/_patterns/06-dist/).
For each page of your static site, create a new folder and add a twig file, such as design.twig, and a JSON file with the same name, such as design.json.

2. Configure the Production JSON Files
The JSON file in each pages' folder is critical for defining production-specific information, including the paths for your CSS, JS, and image assets, page titles, and included scripts.

* Configure the variable paths (cssPath, jsPath, etc.) to your desired structure.
* Include or exclude certain JS libraries from the build by setting 'true' or 'false' values, respectively.
* If using an NDS-based navigation element, use the "navigationPrimaryActiveLink" parameter to add active page styling.

You may also add your own parameters for use in your custom patterns.

3. Configure Gulp Paths to Your Production Pages

Once your 06-dist/ directory is setup, compile Pattern Lab. Next, open your gulpfile.js, and find the "buildPaths" variable declaration. For every page you want to deploy, add a new object. For pageName, add the name of the folder/file for that page in 06-dist/. For target_dest, specify the ultimate path you want that page to file under.

4. Build the Distribution Directory

```
gulp buildProd
```

After running the buildProd command, a public_html/ directory will be created with production ready assets. Upload the contents of this directory to your hosting platform.
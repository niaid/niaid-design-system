
CONTENTS 
----------------------

* Introduction 
* Downloading and Installing a NDS Drupal Theme
* Integrating NDS Design System with NDS Drupal Theme
* Developing with NIAID Design System 
* Drupal Configuration
* Menu
* Maintainers 

INTRODUCTION
------------------

NDS Drupal Theme is a base theme which is integrated with NIAID Design System. NDS Drupal Theme out of the box is a responsive with many regions provided for advance functionality. NDS Drupal Theme distributions come with a great number of theme settings. 

Followings are the features for the theme: 

* Change the look of the website by selecting the theme base color. 
* Configurable NIAID Design System branding logo. 
* Configurable Fonts. 
* Configured system branding and page title blocks. 
* Responsive 

DOWNLOADING AND INSTALLING a NDS DRUPAL THEME
---------------------------------------------------- 

* Unzip the NDS Drupal Theme Folder 
* Install as any other Drupal Contributed Theme and place is under Custom Directory (themes/custom/nds-drupal-theme). For more information about installing a Contributed theme, please visit https://www.drupal.org/docs/extending-drupal/installing-themes 

INTEGRATING NDS DESIGN SYSTEM WITH NDS DRUPAL THEME
---------------------------------------------------------------- 

* This theme is packaged to work with NIAID Design System. Download and install the necessary package below. 
- Node.js (https://nodejs.org/en/download/)
- NPM (https://www.npmjs.com/get-npm)
- Composer (https://getcomposer.org/download/)

* CD into nds folder and install Node and Composer Dependencies
    - npm install
    - composer install
    - gulp 

DEVELOPING WITH NIAID DESIGN SYSTEM
----------------------------------- 

* Please visit our Getting Started Page to find out more information about Developing with NIAID Design System. All NDS out-of-the-box components live in the 00-nds directory inside _patterns/folder. As this folder gets overwritten, you need to make your own custom components, these should be placed in the appropriate atomic folders outiside of 00-nds directory. 

* CSS and JS Files 
 - The global CSS rules can be found in the css/ folder. If you need to override pattern or add some css, you should make edits in the overrides directory. Please go to source/css/overrides and create a .scss files for example drupal/drupal.scss and run gulp to see your changes. 
 - The global JS rules can be found in the JS/ folder. If you need to add project specific JS, you should make edits in the JS directory. Please go to source/JS/ and create a .js file for example project_name.js and run gulp to see your changes.
 - CSS and JS files are compiled into nds-min.css and nds-min.js respectively and the path to base files are already included in nds_drupal_theme.libraries.yml file.   


DRUPAL CONFIGURATION
--------------- 

Configure theme settings in Administration  » Appearance » Settings » NDS Drupal Theme

* For Logo 
    - Select Product Identity and fill Out Top Field - For example NIAID 
    - Select Product Identity and fill out Bottom Field - For example Design System
* Font Headings 
    - Select one from the available options 
* Body Headings 
    - Select one from the available options 
* Shadows 
    - Pick either flat or shadows 
* Corners 
    - Select one from the available options 
* Website Colors: 
    - Select website base theme color. For more information about NDS Theme Color, please visit http://ids-theme-builder.niaid.nih.gov.s3-website-us-east-1.amazonaws.com/. 

Menus
--------------
In NDS Drupal Theme, primary menu is right now hardcoded and implemented using NIAID Design System component. Inorder to modify this menu, please place the menu block on Primary Menu region and uncomment the {{ page.primary_meneu }} on page.html.twig file. The pattern for the menu is found here: @nds/02-molecules/navigation/navigation-primary/_navigation-primary-main.twig. 

MAINAINERS 
-------------- 

Current maintainers: 
* Roshana Devkota
* Jacob Caccamo
<?php

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Theme\ThemeSettings;
use Drupal\system\Form\ThemeSettingsForm;
use Drupal\Core\Form;

function nds_drupal_theme_form_system_theme_settings_alter(&$form, &$form_state) {
    // Create a Logo 
  $form['product_identity'] = array(
    '#type'         => 'details',
    '#title'        => t('Product Identity'),
    '#description'  => t('Product Identity is Displayed in Header'),
    '#weight'       => -999,
    '#open'         => TRUE,
    );

    // Product Identity Top
  $form['product_identity']['product_identity_top'] = [
    '#type'           => 'textfield',
    '#title'          => t('Top'),
    '#description'    => t('Appears on first line of NIAID Logo'),
    '#default_value'  => theme_get_setting('product_identity_top'),
  ];
    // Product Identity Bottom
    $form['product_identity']['product_identity_bottom'] = [
        '#type'           => 'textfield',
        '#title'          => t('Bottom'),
        '#description'    => t('Appears on second line of NIAID Logo'),
        '#default_value'  => theme_get_setting('product_identity_bottom'),
    ];
   
  // Font Family Headings    
  $form['font_family'] = [
        '#type' => 'details',
        '#title' => t('Fonts Headings'),
        '#weight' => -999,
        '#open'  => TRUE,
      ];

    $form['font_family']['font_headings'] = [
      '#type'         => 'radios',
      '#description'  => t('Choose the fonts for Headings'),
      '#options' => [
          'roboto' => 'Roboto', 
          'public-sans' => 'Public Sans', 
          'merriweather' => 'Merriweather',
          'martel' => 'Martel', 
    ],
        '#default_value'  => theme_get_setting('font_headings'),
  ];

    // Font Family Body
    $form['font_family_body'] = [
      '#type' => 'details',
      '#title' => t('Body Headings'),
      '#weight' => -999,
      '#open'  => TRUE,
      ];

    $form['font_family_body']['font_body'] = [
      '#type'         => 'radios',
      '#description'  => t('Choose the fonts for Body'),
      '#options' => [
        'roboto' => 'Roboto', 
        'public-sans' => 'Public Sans', 
      ],
      '#default_value'  => theme_get_setting('font_body'),
    ];

   // Box Shadows  
    $form['box_shadows'] = [
      '#type' => 'details',
      '#title' => t('Shadows'),
      '#weight'  => -999,
      '#open'  => TRUE,
    ];
    $form['box_shadows']['shadows'] = [
      '#type'         => 'radios',
      '#description'  => t('Choose the Shadows'),
      '#options' => [
      'flat' => 'Flat', 
      'shadows' => 'Shadows', 
    ],
      '#default_value'  => theme_get_setting('shadows'),
    ];

  //Box Corners 
  $form['box_corners'] = [
    '#type' => 'details',
    '#title' => t('Corners'),
    '#weight' => -999,
    '#open'  => TRUE,
  ];
    $form['box_corners']['corners'] = [
      '#type'         => 'radios',
      '#description'  => t('Choose the Corners'),
        '#options' => [
            'sharp' => 'Sharp', 
            'semirounded' => 'Semi Rounded',
            'rounded' => 'Fully Rounded' 
        ],
        '#default_value'  => theme_get_setting('corners'),
      ];
  
    // Website Color - change the theme base color.
    $form['website_color'] = [
      '#type' => 'details',
      '#title' => t('Website Color'),
      '#weight' => -999,
      '#open'  => TRUE,
    ];

    $form['website_color']['website_base_color'] = [
      '#type' => 'radios',
      '#title' => t('Select Website Theme Color'),
      '#options' => [
        'theme-1' => t('Theme One'),
        'theme-2' => t('Theme Two'),
        'theme-3' => t('Theme Three'),
      ],
      '#default_value' => theme_get_setting('website_base_color'),
      '#description' => t('Select the base color of the theme to give a complete new look to the website. Please visit the <a href="http://nds.niaid.nih.gov.s3-website-us-east-1.amazonaws.com/">NIAID Design System documentation site</a> to find out about available color options'),
  ];
}


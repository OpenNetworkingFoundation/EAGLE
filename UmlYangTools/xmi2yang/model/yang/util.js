/********************************************************************************************************
 * Name: UML to YANG Mapping Tool
 * Copyright 2015 CAICT (China Academy of Information and Communication Technology (former China Academy of Telecommunication Research)). All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 *
 * This tool is developed according to the mapping rules defined in onf2015.261_Mapping_Gdls_UML-YANG.08 by OpenNetworkFoundation(ONF) IMP group.
 *
 * file: \model\yang\module.js
 *
 * The above copyright information should be included in all distribution, reproduction or derivative works of this software.
 *
 ****************************************************************************************************/

if (!String.prototype.contains) {
    String.prototype.contains = function(search) {
        return this.indexOf(search) > -1;
    };
}

if (!String.prototype.hasFeatureName) {
  String.prototype.hasFeatureName = function() {
      return this.contains('\r') && !this.split('\r')[0].contains(' ');
  };
}

if (!String.prototype.featureName) {
  String.prototype.featureName = function() {
      if (this.hasFeatureName()) {
          return this.split('\r')[0];
      }
      return this;
  };
}

if (!String.prototype.featureDescription) {
  String.prototype.featureDescription = function() {
      if (this.hasFeatureName()) {
          return this.split('\r').slice(1).join('\r');
      }
      return this;
  };
}


exports.yangifyName = function(str) {
    return str
        .replace( /([a-z])([A-Z])/g, '$1-$2' ) // insert dashes
        .replace( /([0-9]+)/g, '-$1' )
        .replace( /([0-9]+)([A-Z])/g, '$1-$2' )
        .toLowerCase()                         // lowercase everything
        .replace( /^_/, '')                    // remove leading underscore
        .replace( /:_/g, ':')                  // and leading underscores in path segments
        .replace( /[_.]/g, '-')              // convert underscore and period to dash
        .replace( /(^-)/g, '')
        .replace( /-{2}/g, '-');
};

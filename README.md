[![Stories in Ready](https://badge.waffle.io/sadayuki-matsuno/pdf.png?label=ready&title=Ready)](https://waffle.io/sadayuki-matsuno/pdf)
# This is Matsuno PDF Viewer

[![Circle CI](https://circleci.com/gh/sadayuki-matsuno/pdf.svg?style=svg)](https://circleci.com/gh/sadayuki-matsuno/pdf)

# Feature

You can manage your PDF files without any hosted servers.

sotrege: aws s3

authentication: facebook + aws cognito

web: github pages

# Description

This is PDF Viewer.

You can lauch your own PDF viewer without servres

# Dependency

- npm
- [davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit/issues) (v 1.0.1)
- AWS S3
- AWS Cognito
- FacebookSDK
- Github Pages

# Constitution



# Usage

## Agenda

- setup aws s3
- setup facebook for developper
- setup aws cognito
- setup this repo
- change configure
- build redux
- setup github pages
- deploy

## SETUP AWS S3

- create bucket
- configure the bucket's CORS

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

## SETUP FACEBOOK FOR DEVELOPPER

- create your app
- fill in basic settings and advanced settings  with your site url
- fill in advanced settings' [Valid OAuth redirect URIs] with your site url

## SETUP AWS COGNITO

- create identity pool
- fill in facebook setting with your facebook APP ID

## SETUP THIS REPO

```bash
$ git clone https://github.com/sadayuki-matsuno/pdf.git
```

```bash
$ cd pdf
$ npm install
```

more detail is [here](https://github.com/davezuko/react-redux-starter-kit)

## CHANGE CONFIGURE

- edit config.js

```js
$ vim src/config/config.js

export const awsRegion = 'YOUR_S3_REGION'
export const awsIdentityPoolId = 'YOUR_COGNITO_IDENTITY_POOL_ID'
export const awsBucketName = 'YOUR_S3_BUCKET_NAME'
export const facebook = 'graph.facebook.com' // no need to change
export const fbAppId = 'YOUR_FACEBOOK_APP_ID'
export const fbScope = 'public_profile, email' // no need to change
```

## BUILD REDUX

- compile

```bash
$ NODE_ENV=production npm run compile
```

You can get static html files in dist

## SETUP GITHUB PAGES

- create [YOUR_GITHUB_ACCOUNT].github.io
- create another repository named `pdf`

## DEPLOY

- init git under dist
- push dist to `gh-pages` brach in `pdf` repository

Now, you can access to http://[YOUR_ACCOUNT_NAME].github.io/pdf


# AUTHOER

Sadayuki Matsuno


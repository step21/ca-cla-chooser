# Contributor License Agreement Chooser


This is a simple Contributor License Agreement wizard that uses
bootstrap, jquery and bootstrap-wizard.

For some functionality, like creating shortUrls, it relies on small services that live in the parent organization of this repository. (such as https://github.com/contributoragreements/u2s)

## Installation

Clone the repository.
 
 ```
 git clone https://github.com/contributoragreements/ca-cla-chooser
 cd ca-cla-chooser
 ```
 
Initialize and synchonize the submodule for the bootstrap wizard.

```
 git submodule init
 git submodule update
```

Then you can serve the directory with any local or remote webserver that you like.
For development and testing you can use npm to install some dependencies that allow for easy local development and testing.

First install all the dependencies. 

```
 npm install
```

Then you can use `npm start` to start a local webserver that serves the app. You can use `npm test` to run the tests. Or you can use `npm serve-and-test` to start the webserver and then run the tests all at once.
The tests use chai/mocha and webdriverio.
 
## Content Structure

### Overview of all options

The following mermaid graph displays the overall flow of the contributor agreement license wizard. Please bear in mind that this graph is a simplification. For example the three outbound copyright options for the FLA path follow almost exactly the same path as those on the CLA path, but this is not show for accessibility. Similarly, fields for project name, email address and similar personal details can sometimes trigger small UI changes (like whether or not to show an e-sign link) but otherwise are inconsequential for the wizard flow.

[![](https://mermaid.ink/img/pako:eNqdVk1v2zAM_SuEgWId0GBYPy49DGjdpM2QLUFTbAcnB8WmEw2yZEjyMsPNfx9ty47rZEPbXCyRj6T4SCoqvFBF6F17sVDbcMO0hcnjQgL9TLZaa5ZuYI0SNRMztsZacxPc16IlDAZfnkeTG5imliv5DLen5W7G7GbL8o8OXqH8Dso_9Q9QKKN6cXLSj3zHLGt0EdcYll7g9qmR3RXFD6avYSgtt_luNxgMho1u6HQzrX6R4XeWYAUYNYDRS8BPXBlua8x9g7l_iRl-Y1xUiIcG8eAQc76WXK4JGKIxXWfjBjp20K-Z5ibiVTK7XaPt0NDhneyPcNEBlBRDqNJc8_XG7kt1S3KqSE28qWU-efvi94Qt50ec7Dl_um1ig9KQarViK5F_Sli-QjCp4BbwD31CbkUOK7RbRAmhYJ9iwc4Af9OOx0AwbiClbuNMEDAzxBnYDfmg-kDZkr1THeTw2Eo-B-4Lo-l8DhMeojRolgfAcwc8h6mkoCbFkMc8_J9F2SiTmzkKwhQFfYkHjEA4i6ZsHZMLF-TCuS0TmykyyGE0HwGTEUzn48NQF3UoMiJ0URwYT1TIup3S9klLUb-ih1XzHwkzliuVySgoJ5DXazA2F7jsgF7HrP9mZv0us_6rmPXfyazfZdZ_A7Md00sX8hKaVIDZkvGEG0Pyw2BXzuIKvivq4yThNkFpl-31pcKsFFQRm2whpmGiQShLCKquIc1RiKl1V-ZVO3ZFcdxFuFG0OuiOdvFirGn-U2bJx37G2zbqKyhmeaVnVBR40iziZVgmytubcC0vq8xCpNDIDxZUHCMl5M7UuJkFlYkz8Cud46WO2TTdv6McgZ8H44g21G7UPQ49ExitG3DLwP4KadN3EV0V36s_757K0avxN8ftEXr7inofULckSmNT_f7Z91bkm6WpyI-47smrbet4etzxyYlf_TtPJT7DXTBhqVXp8qXuaaueYRjw2UZJ7Os2GslyFMTsOmaDkGnwmV56Z16COmE8oqdFUZosPLreE1x417SMMGaZsAtvIXcEZZlV81yGHrkQBs-8LI2IzDvOKLGklSJ1hdLf6vdK9WzZ_QW8iewX?type=png)](https://mermaid.live/edit#pako:eNqdVk1v2zAM_SuEgWId0GBYPy49DGjdpM2QLUFTbAcnB8WmEw2yZEjyMsPNfx9ty47rZEPbXCyRj6T4SCoqvFBF6F17sVDbcMO0hcnjQgL9TLZaa5ZuYI0SNRMztsZacxPc16IlDAZfnkeTG5imliv5DLen5W7G7GbL8o8OXqH8Dso_9Q9QKKN6cXLSj3zHLGt0EdcYll7g9qmR3RXFD6avYSgtt_luNxgMho1u6HQzrX6R4XeWYAUYNYDRS8BPXBlua8x9g7l_iRl-Y1xUiIcG8eAQc76WXK4JGKIxXWfjBjp20K-Z5ibiVTK7XaPt0NDhneyPcNEBlBRDqNJc8_XG7kt1S3KqSE28qWU-efvi94Qt50ec7Dl_um1ig9KQarViK5F_Sli-QjCp4BbwD31CbkUOK7RbRAmhYJ9iwc4Af9OOx0AwbiClbuNMEDAzxBnYDfmg-kDZkr1THeTw2Eo-B-4Lo-l8DhMeojRolgfAcwc8h6mkoCbFkMc8_J9F2SiTmzkKwhQFfYkHjEA4i6ZsHZMLF-TCuS0TmykyyGE0HwGTEUzn48NQF3UoMiJ0URwYT1TIup3S9klLUb-ih1XzHwkzliuVySgoJ5DXazA2F7jsgF7HrP9mZv0us_6rmPXfyazfZdZ_A7Md00sX8hKaVIDZkvGEG0Pyw2BXzuIKvivq4yThNkFpl-31pcKsFFQRm2whpmGiQShLCKquIc1RiKl1V-ZVO3ZFcdxFuFG0OuiOdvFirGn-U2bJx37G2zbqKyhmeaVnVBR40iziZVgmytubcC0vq8xCpNDIDxZUHCMl5M7UuJkFlYkz8Cud46WO2TTdv6McgZ8H44g21G7UPQ49ExitG3DLwP4KadN3EV0V36s_757K0avxN8ftEXr7inofULckSmNT_f7Z91bkm6WpyI-47smrbet4etzxyYlf_TtPJT7DXTBhqVXp8qXuaaueYRjw2UZJ7Os2GslyFMTsOmaDkGnwmV56Z16COmE8oqdFUZosPLreE1x417SMMGaZsAtvIXcEZZlV81yGHrkQBs-8LI2IzDvOKLGklSJ1hdLf6vdK9WzZ_QW8iewX)

There is also a function dependency graph between the various functions, though it might be quite hard to understand. Most likely, reading the new and improved comments in the code should be more helpful.

![function graph of chooser.js](out.png)

### Reference of query parameters

The following parameters are valid for the the query parameters (url) and are loaded into the `configs` object.

* beneficiary-name=STRING
* project-name=STRING
* project-website=STRING
* project-email=STRING (some regex verification is performed)
* process-url=STRING
* project-jurisdiction=STRING

* fsfe-compliance=fsfe-compliance|non-fsfecompliance
* agreement-exclusivity=exclusive|non-exclusive
* outbound-option=fsfe|same-licenses|license-policy|same|no-commitment
* outbound-list=[license1,license2]
* outbound-list-custom=STRING
* license-policy-location=STRING
* medialist=[license1,license2]
* patent-option=Traditional|Patent-Pledge (Traditional patent license or patent pledge) (NB: for some reason one of the few options that starts with an uppercase letter FIXME)

These are so far only used during signing.
* your-date=STRING
* your-name=STRING
* your-title=STRING
* your-address=STRING
* your-patents=STRING

The position of the wizard
* pos=general|copyright|patents|review|apply

The signing action
* action=sign-individual|sign-entity|sign-fla|sign-fla-entity

## Configuration

The location of the microservices (https://github.com/contributoragreements/service.fabricatorz.com) defaults to the contributoragreements.org url. This can be changed through js/config.json file e.g.:

  ```
  {
      "serviceUrl": "http://contributoragreements.org",
      "urlShortener": "http://contributoragreements.org/u2s"
  }
  ```

## Local testing

In the root directory, run `npm start` to start a local webserver to server the project.

## Further development

Ideas for further development can be found in the issues and pull requests of this repo and in the forks of this repo. We welcome any questions and PRs.

https://github.com/contributoragreements/ca-cla-chooser/issues?q=is%3Aopen+is%3Aissue


## Contact

* team@contributoragreements.org

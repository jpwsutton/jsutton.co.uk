---
date: "2017-06-17T18:15:57Z"
description: ""
draft: false
slug: internet-connected-photo-printer-p
title: Internet Connected Photo Printer - Introduction
cover:
  image: cover.jpg
---


<!--![cover-image](/content/images/2017/06/DSC_0001-Edit-2.jpg)-->

I've had an idea for a while now about building an internet connected photo printer that automatically prints photos for me at home as a when I take them on my phone. I had originally thought about getting hold of a [Polaroid Zip](http://www.polaroid.com/zip-instant) that would print Instant photos. However from looking online it seemed to have a few drawbacks that I didn't fancy. 

1) It didn't have the classic 'Polaroid Border'
2) It was Bluetooth which would most likely be a pain to hack.

Fortunately another option became available, the [Fujifilm Instax Share SP-2](http://www.fujifilm.com/products/instant_photo/printers/instax_share_sp_2/). This printer has a few advantages that I really like:

1) It uses the same instant photo cartridges that all other Fuji Instax Instant Cameras use which makes it quite easy to get hold of.
2) The Instant photos are credit card sized which I prefer
3) The Photos also have the classic border around them which really wanted.
4) The SP-2 uses WiFi instead of Bluetooth, which should hopefully make it easier to reverse engineer.

As there weren't APIs available for either the Polaroid Zip or the SP-2, I felt that I may as well go ahead and see if I can build one for myself and others to use.

Unfortunately Fujifilm have not publicised how the SP-1 or 2 APIs work, however from having a go with the device I've established this so far:

* The SP-2 creates a small WiFi Hotspot with no password.
* When using the [Official App](https://play.google.com/store/apps/details?id=com.fujifilm.instaxshare) to print photos, the App changes the Phones WiFi Connection to connect to the SP-2.
* The App Can perform a number of functions with the printer, including:
 *  Authenticate using a 4 digit pin (1111 by default).
 * Change the Pin.
 * Print a Photo.

Currently, my plan to study the API is this:

* Join the SP-2 wireless network with my laptop and start Wireshark in monitor mode to capture any packets.
* Open the Instax Share app and perform each of the possible functions and identify the packets captured in Wireshark that were part of the relevant transaction.
* Create a python script that can mock these API calls and see if I can print a photo.

Once I've succeeded in doing this, I'll write a proper Python library that allows me to print photos on demand.

There are a few things to note though:

* The SP-2 printer will turn itself off if not used for:
  *  3 minutes if have not printed photo.
  *  5 minutes if a photo has just been printed.
  *  10 minutes if connected to a charger.
* Expected Photo size is 800x600

Because of the auto-shutdown, we will have to implement a way to automatically connect to the correct SSID when attempting to print. This of course assumes that the SP-2 has already been turned on. I will tackle these problems in my wider project which will use a Raspberry Pi 3 as the host device. But for the Python Library I will assume that the SP-2 is on and that the host device is connected to it's SSID.


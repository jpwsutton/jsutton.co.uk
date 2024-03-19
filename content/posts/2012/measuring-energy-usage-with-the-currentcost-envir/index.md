---
date: "2012-03-30T20:44:00Z"
description: ""
draft: false
slug: measuring-energy-usage-with-the-currentcost-envir
title: Measuring Energy Usage with the CurrentCost EnviR
cover:
  image: cover.jpg
---

One project that has taken up a large portion of my time recently has been my energy monitor project. This setup is quite common and I was able to put the scripts together with relative ease thanks to all the people who have done it before me.


![](https://jsutton.co.uk/content/images/2016/04/graph1.png)

Here is my version, it is a little bit different from most as I chose to code the graphing and database functions manually instead of using an [RRDtool](http://oss.oetiker.ch/rrdtool/) setup, if you want something a bit simpler, feel free to check out [jibble.org](http://www.jibble.org/currentcost/) where there is a great tutorial that is quick and easy to follow. If however you plan on doing something customised to your particular needs, hopefully this tutorial will show you what you need to do!

### What you will need:
* A CurrentCost EnviR + FTDI cable (Most currentcost models can be used, however I cannot guarantee that you will be able to do everything the same for other versions)
* A Computer to Upload the data (I used an eeePC with Arch Linux)
* A web server to store and display the data running MySQL and PHP (this could be the same machine as above)
* The Currentcost Mains Sensor
* The CurrentCost IAMs (Individual Appliance Monitors – optional)

![](https://jsutton.co.uk/content/images/2016/04/DSC_01787.jpg)

## Step 1 - Set up CurrentCost on your computer

In my case, I was using an eeePC with Arch Linux on it, however my code could run on any OS capable of running Perl with the appropriate modules.

I used this great tutorial here which explains how to get the CurrentCost Envir working with ubuntu (although arch worked just as well). The only thing that I had to change was the baud-rate which instead of 9600, was 57600. Once you have it plugged in and working, you need to set up your Perl script.

You can download my copy of the Perl script at https://github.com/jpwsutton/powermon . Please forgive any lack of comments. I will refactor the script to make it easier to digest and re post it in the next installment.

You will want to change some settings to match your own setup, serial port and URL are obvious things that you will need to change, however some of the other settings are slightly more complex. For example; the %sensors hash, should only contain as many items as you have sensors. For example, If you only have the one sensor monitoring the incoming power supply, then you only want one item in the hash. If you have purchased the separately sold IAMs (Individual Appliance Monitors) then you will want to declare those as well.

    # The sensors that you have paired with the EnviR
    my %sensors;
    $sensors{'0'}{name} = 'main';
    $sensors{'1'}{name} = 'sensor-1';
    $sensors{'2'}{name} = 'sensor-2';
    $sensors{'3'}{name} = 'sensor-3';
    
This would mean that the script will not finish until it has collected data for all four of those sensors.

Once you have the script set up on your computer and you have changed the settings accordingly. You should be ready to go!

Lets quickly test this before we continue:

    CurrentCost Envir XML Parser V1.0
    
    About to parse data...
    Sensor: 2
    Watts:  00064
    Temp:   25.5
    Hash:   f5c50567ef1359e9340d6f7aad84a4e3
    1  complete out of 4
    Sensor: 1
    Watts:  00116
    Temp:   25.5
    Hash:   9939cccb8aa50a10aa20f8e3813f2344
    2  complete out of 4
    Sensor: 3
    Watts:  00000
    Temp:   25.5
    Hash:   2a05799d2477ffff47856f54850cfc90
    3  complete out of 4
    Sensor: 0
    Watts:  00631
    Temp:   25.5
    Hash:   55c5effd5c66f11325f726737e9dd9a0
    4  complete out of 4
    
That looks great! Don’t worry if you see any URLs that fail to resolve, that will come in step 2.

## Step 2 - There is no step 2, this is out of date!

There was originally a step two and three, however as with all technology, these steps were quite outdated. I will soon be writing a new post explaining how I do all of this using [Node-Red](http://nodered.org/) which is a lot more exciting and very 2014!

If you still wish to use my code, you can take a look at the git repo at https://github.com/jpwsutton/powermon which myself and [Sam](https://github.com/SamFinnigan) worked on for a while. It could still be useful if you plan on working with the EnviR or if you fancy on using PHP and the Flot Javascript Graphing library.
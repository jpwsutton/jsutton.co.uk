---
date: "2019-12-25T18:04:56Z"
description: ""
draft: true
slug: gamifying-the
title: Gamifying your new year's resolutions... with Monzo!
---


Christmas has come again, new year is just around the corner and yet again we're going to set ourselves some unachievable targets for the next 12 months.

Last year, I set myself the optimistic target of doing 50 parkruns. This sadly didn't happen as I spent a lot of weekends away from any parkruns and without my kit (my fault there).

Part of the problem was that I set my target too high, didn't think about how or if I'd be able to achieve it and then more or less gave up as soon as failure was imminent.

So this year, my partner and I have decided to try and set ourselves some more realistic and easier to achieve targets that don't require the stars to align once a week in order for us to manage them. Research has shown that if you repeat actions daily, then they are easier to commit to. So, these should be small, easily repeated things that we can do day to day rather than week to week. Some examples of the little goals we've chosen are: Getting some (any) exercise, drinking enough water, going to bed at a decent time and opting of the healthier of meals each day. Hopefully these are all small enough and achievable enough that if we can get in the habit of doing them every or every other day, then we should be able to keep them up for the whole year.(and beyond!)

Of course, it's easy enough just to plan to do these little things every day, and of course the betterment of our bodies and minds should be enough to encourage us, but sometimes, you just need an over designed and technical solution to help you do it!

## So what are we building?

The plan is to build a physical device that can sit on our fridge that has a button for each activity that we want to achieve / track. When we complete an activity each day, we can press the relevant button. Connected to the buttons is a Raspberry Pi Zero W running Node-RED that will allow only one button press each day. When a button is pressed, the Node-RED flow will log which activity was completed, and then move a set amount of money from my main Monzo account to a savings pot. The idea behind this is that we can reward ourselves for completing our mini goals by getting closer and closer to a savings goal. We're only going to be moving small amounts e.g. 10 or 20 p per event, but across 5 odd goals / targets this could add up over the year. There will also be some neopixels hidden inside that will give a satisfying flash each time a button is pressed, because let's face it. Everything is better with LEDs!

## Part 1: The Hardware

To build this we're going to need a few things, fortunately the good ol crew at Pimoroni can provide:

- [5x Mini Arcade Buttons](https://shop.pimoroni.com/products/mini-arcade-buttons?variant=40377171146)
- [Flexible NeoPixel Strip](https://shop.pimoroni.com/products/flexible-rgb-led-strip-neopixel-ws2812-sk6812-compatible?variant=3026003207790760%20pixels%20per%20metre)
- [Raspberry Pi Zero (W)](https://shop.pimoroni.com/products/raspberry-pi-zero-w)
- 1x 1N4001 Diode or an 74AHCT125 (To do some level conversion for the NeoPixels)

It's a fairly simple setup, we're just going to connect the buttons to +3v and the NeoPixels to one of the compatible GPIO pins using either the Diode, or the 74AHCT125 level shifter. There's a great example of how to do this at the Adafruit NeoPixels on Raspberry Pi guide (https://learn.adafruit.com/neopixels-on-raspberry-pi/raspberry-pi-wiring)

Diagram here!

## Part 2: The enclosure

This is going to be a simple enclosure that's as thin as possible, but also has a good surface area so that we can put enough magnets on the back in order to have a good fix onto our fridge door. It also needs to be thin / transparent enough that the light from the LEDs gets through and diffuses nicely.

3D Design here!



Part 3: The Node-RED Flow

Node-RED will quite nicely do everything we need for this, we can hook into the GPIO pins to get button presses, control the NeoPixels with the [node-red-node-pi-neopixel](https://flows.nodered.org/node/node-red-node-pi-neopixel) node and talk to Monzo with the [node-red-contrib-monzo](https://flows.nodered.org/node/node-red-contrib-monzo) node.

We can even build a dashboard to let us check on our current balance, and show when the last activity was logged (for the data lovers). I'll assume that you know how to set up Node-RED and install nodes, so I'll just include the flow in the gist below.<insert picture of flow here>








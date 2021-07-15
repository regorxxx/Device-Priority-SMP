# Device-Priority-SMP
[![version][version_badge]][changelog]
[![CodeFactor][codefactor_badge]](https://www.codefactor.io/repository/github/regorxxx/ Device-Priority-SMP/overview/main)
[![CodacyBadge][codacy_badge]](https://www.codacy.com/gh/regorxxx/ Device-Priority-SMP/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=regorxxx/ Device-Priority-SMP&amp;utm_campaign=Badge_Grade)
![GitHub](https://img.shields.io/github/license/regorxxx/ Device-Priority-SMP)  
[Spider Monkey Panel](https://theqwertiest.github.io/foo_spider_monkey_panel) Script for [foobar2000](https://www.foobar2000.org), built within a button toolbar. Automate foobar2000's output without having to select devices manually every time one is disconnected/connected. Wireless, headphone, and server devices auto-switch made easy.

![Animation7](https://user-images.githubusercontent.com/83307074/116756221-471e8500-a9fb-11eb-96c9-2c269bf91fef.gif)

## Features

![Animation9](https://user-images.githubusercontent.com/83307074/116756215-44239480-a9fb-11eb-8489-b56a178c70f4.gif)

* **Export Device List:** after connecting all devices desired to be used at some point, the list can be exported to be able to set them at a later point as prioritized devices (even if they are not connected).
* **1-5 slots for prioritized devices:** set the order in which the devices must be set as output. Device 1 would be used (if available) before Device 2 and so on...
* **Server friendly:** some wireless devices pause playback when they are disconnected, thus requiring to manually start playback again even if the device has been changed (manually or automatically). The script checks if playback is paused after swapping devices and will continue it automatically in those cases for a seamless change between devices when you switch them off/on.
* **Toolbar:** the button can be loaded within a toolbar or as an independent button. It's fully compatible with my other scripts which also use a toolbar (see at bottom), so the button can be simply merged with your already existing toolbar panel easily.

![Animation8](https://user-images.githubusercontent.com/83307074/116756213-4259d100-a9fb-11eb-9452-657389977f69.gif)

![Animation10](https://user-images.githubusercontent.com/83307074/116756219-4685ee80-a9fb-11eb-80be-413f0e691dd4.gif)

### Compatible with (toolbar)
 1. [Search-by-Distance-SMP](https://github.com/regorxxx/Search-by-Distance-SMP): creates intelligent "spotify-like" playlist using high-level data from tracks and computing their similarity using genres/styles.
 2. [Playlist-Tools-SMP](https://github.com/regorxxx/Playlist-Tools-SMP): Offers different pre-defefined examples for intelligent playlist creation.

![playlist_tools_menu_05](https://user-images.githubusercontent.com/83307074/116759000-cebac280-aa00-11eb-8a81-9a450e13205a.gif)

## Installation
Copy all files from the zip into YOUR_FOOBAR_PROFILE_PATH\scripts\SMP\xxx-scripts  
Any other path WILL NOT work without editing the scripts. (see images\_Installation_*jpg)  
For ex: mine is c:\Users\xxx\AppData\Roaming\foobar2000\scripts\SMP\xxx-scripts\...  
For portable installations >= 1.6: .\foobar2000\profile\scripts\SMP\xxx-scripts\...  
For portable installations <= 1.5: .\foobar2000\scripts\SMP\xxx-scripts\...  
Then load 'buttons_device_priority.js' (button) into a SMP panel within foobar. If you already have the toolbar from any of my other scripts, just load the button using the config menu on the toolbar within foobar2000.

[changelog]: CHANGELOG.md
[version_badge]: https://img.shields.io/github/release/regorxxx/ Device-Priority-SMP.svg
[codacy_badge]: https://api.codacy.com/project/badge/Grade/e04be28637dd40d99fae7bd92f740677
[codefactor_badge]: https://www.codefactor.io/repository/github/regorxxx/ Device-Priority-SMP/badge/main

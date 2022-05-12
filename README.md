# Device-Priority-SMP
[![version][version_badge]][changelog]
[![CodeFactor][codefactor_badge]](https://www.codefactor.io/repository/github/regorxxx/Device-Priority-SMP/overview/main)
[![CodacyBadge][codacy_badge]](https://www.codacy.com/gh/regorxxx/Device-Priority-SMP/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=regorxxx/Device-Priority-SMP&amp;utm_campaign=Badge_Grade)
![GitHub](https://img.shields.io/github/license/regorxxx/Device-Priority-SMP)  
[Spider Monkey Panel](https://theqwertiest.github.io/foo_spider_monkey_panel) Script for [foobar2000](https://www.foobar2000.org), built within a button. Automate foobar2000's output without having to select devices manually every time one is disconnected/connected. Wireless, headphone, and server devices auto-switch made easy.

![Auto-device](https://user-images.githubusercontent.com/83307074/125860905-3127eee3-5618-4487-a181-b8defbd6031f.gif)

## Features

* **Export Device List:** after connecting all devices desired to be used at some point, the list can be exported to be able to set them at a later point as prioritized devices (even if they are not connected).
* **1-5 slots for prioritized devices:** set the order in which the devices must be set as output. Device 1 would be used (if available) before Device 2 and so on...
* **Server friendly:** some wireless devices pause playback when they are disconnected, thus requiring to manually start playback again even if the device has been changed (manually or automatically). The script checks if playback is paused after swapping devices and will continue it automatically in those cases for a seamless change between devices when you switch them off/on.
* **Toolbar:** the button can be loaded within a toolbar or as an independent button. It's fully compatible with my other scripts which also use a toolbar (see at bottom), so the button can be simply merged with your already existing toolbar panel easily.

### Compatible with (toolbar)
 1. [Search-by-Distance-SMP](https://github.com/regorxxx/Search-by-Distance-SMP): creates intelligent "spotify-like" playlist using high-level data from tracks and computing their similarity using genres/styles.
 2. [Playlist-Tools-SMP](https://github.com/regorxxx/Playlist-Tools-SMP): Offers different pre-defefined examples for intelligent playlist creation.

![Auto-device2](https://user-images.githubusercontent.com/83307074/125861102-9253716b-ded6-41d5-83b5-84664edeb17f.gif)

## Installation
See [_TIPS and INSTALLATION (txt)](https://github.com/regorxxx/Device-Priority-SMP/blob/main/_TIPS%20and%20INSTALLATION.txt) and the [Wiki](https://github.com/regorxxx/Device-Priority-SMP/wiki/Installation).
Not properly following the installation instructions will result in scripts not working as intended. Please don't report errors before checking this.

[changelog]: CHANGELOG.md
[version_badge]: https://img.shields.io/github/release/regorxxx/Device-Priority-SMP.svg
[codacy_badge]: https://api.codacy.com/project/badge/Grade/e04be28637dd40d99fae7bd92f740677
[codefactor_badge]: https://www.codefactor.io/repository/github/regorxxx/Device-Priority-SMP/badge/main

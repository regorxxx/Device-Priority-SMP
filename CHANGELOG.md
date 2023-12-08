# Changelog

## [Table of Contents]
- [Unreleased](#unreleased)
- [1.13.1](#1131---2023-12-08)
- [1.13.0](#1130---2023-11-28)
- [1.12.0](#1120---2023-11-24)
- [1.11.1](#1111---2023-11-16)
- [1.11.0](#1110---2023-11-15)
- [1.10.0](#1100---2023-10-05)
- [1.9.7](#197---2023-09-25)
- [1.9.6](#196---2023-09-20)
- [1.9.5](#195---2023-09-14)
- [1.9.4](#194---2023-07-29)
- [1.9.3](#193---2023-07-28)
- [1.9.2](#192---2023-06-29)
- [1.9.1](#191---2023-06-27)
- [1.9.0](#190---2023-05-08)
- [1.8.1](#181---2023-03-09)
- [1.8.0](#180---2023-03-08)
- [1.7.1](#171---2023-03-04)
- [1.7.0](#170---2023-03-04)
- [1.6.0](#160---2023-02-22)
- [1.5.2](#152---2023-02-21)
- [1.5.1](#151---2023-02-19)
- [1.5.0](#150---2023-02-15)
- [1.4.0](#140---2022-08-22)
- [1.3.1](#131---2022-08-21)
- [1.3.0](#130---2022-08-12)
- [1.2.5](#125---2022-08-09)
- [1.2.4](#124---2022-08-05)
- [1.2.3](#123---2022-05-23)
- [1.2.2](#122---2022-05-04)
- [1.2.1](#121---2022-04-13)
- [1.2.0](#120---2022-03-02)
- [1.1.1](#111---2021-12-23)
- [1.1.0](#110---2021-10-14)
- [1.0.1](#101---2021-10-10)
- [1.0.0](#100---2021-09-10)

## [Unreleased][]
### Added
### Changed
### Removed
### Fixed

## [1.13.1] - 2023-12-08
### Added
- Toolbar: now supports color for image icons (which are not drawn using fonts).
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.13.0] - 2023-11-28
### Added
- Buttons bar: added compatibility with headless mode (for other buttons).
- UI: added setting to disable tooltip on all scripts. Found at '[FOOBAR PROFILE FOLDER]\js_data\presets\global\globSettings.json', by changing 'bTooltip'. By default tooltip is always shown. This setting will never be exposed within foobar, only at this file.
### Changed
- Helpers: updated helpers.
- Improved error messages about features not working related to OS checks (at startup) with tips and warnings.
### Removed
### Fixed

## [1.12.0] - 2023-11-24
### Added
- Buttons bar: new setting to enable asynchronous loading of buttons, now the default behavior.
### Changed
- Helpers: updated helpers.
- Console: reduced max log file size to 1 MB.
### Removed
### Fixed
- Auto-update: changed logic to check [Playlist Tools](https://github.com/regorxxx/Playlist-Tools-SMP/)'s buttons updates independently to the toolbar version, so mixed scripts versions no longer produce false negatives.

## [1.11.1] - 2023-11-16
### Added
### Changed
- Buttons bar: transparency input popup now has a description for the values.
### Removed
### Fixed
- Buttons bar: border setting was grayed out when the buttons color had been set.

## [1.11.0] - 2023-11-15
### Added
- Auto-update: added -optional- automatic checks for updates on script load; enabled by default. Compares version of current file against GitHub repository. Manual checking can also be found at the settings menu. For buttons within the toolbar every button will check for updates independently (although the toolbar menu has an entry for batch checking). Setting may also be globally switched at '[FOOBAR PROFILE FOLDER]\js_data\presets\global\globSettings.json', by changing 'bAutoUpdateCheck'. It will apply by default to any new installed script (previous scripts will still need to be manually configured to change them).
- Buttons bar: added some safe-checks to panel properties.
- Buttons bar: added custom button hover color and customization.
- Buttons bar: added custom offset for buttons along X/Y axis.
- Buttons bar: added full size mode for buttons, which will use full Width/Height according to Y/X orientation.
- Added setting to disable popups related to features not being supported by the OS (at startup). Found at '[FOOBAR PROFILE FOLDER]\js_data\presets\global\globSettings.json', by changing 'bPopupOnCheckSOFeatures'. By default popups are always shown. This setting will never be exposed within foobar, only at this file.
### Changed
- UI: toolbar's color menu entries now show the color name along the menu entry. 'none' equals to no color.
- Buttons bar: renamed background buttons to 'Use themed buttons', which depends on the windows theme.
- Helpers: updated helpers.
### Removed
### Fixed

## [1.10.0] - 2023-10-05
### Added
### Changed
- Configuration: expanded user configurable files at '[FOOBAR PROFILE FOLDER]\js_data\presets\global' with new queries. File will be automatically updated with new values (maintaining the user settings).
- Configuration: improved the user configurable files update check for missing keys.
- Helpers: updated helpers
### Removed
### Fixed

## [1.9.7] - 2023-09-25
### Added
### Changed
- Helpers: updated helpers
### Removed
### Fixed

## [1.9.6] - 2023-09-20
### Added
### Changed
- Helpers: updated helpers
### Removed
### Fixed

## [1.9.5] - 2023-09-14
### Added
### Changed
- Helpers: updated helpers
### Removed
### Fixed

## [1.9.4] - 2023-07-29
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.9.3] - 2023-07-28
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed
- Fix for non [standard hyphen chars](https://jakubmarian.com/hyphen-minus-en-dash-and-em-dash-difference-and-usage-in-english/) on path names.

## [1.9.2] - 2023-06-29
### Added
### Changed
### Removed
### Fixed
- Helpers: fixed incorrect warning about missing font.

## [1.9.1] - 2023-06-27
### Added
### Changed
- Helpers: updated helpers.
- Console: menu entries are no longer logged to console after clicking.
- Console: multiple improvements when logging to file for FbMetadbHandle, FbMetadbHandleList, Error and unknown instances (totally irrelevant except for debug purposes).
### Removed
### Fixed

## [1.9.0] - 2023-05-08
### Added
### Changed
- Helpers: updated helpers.
- Console: menu entries are no longer logged to console after clicking.
- Console: multiple improvements when logging to file for FbMetadbHandle, FbMetadbHandleList, Error and unknown instances (totally irrelevant except for debug purposes).
### Removed
### Fixed

## [1.8.1] - 2023-03-09
### Added
### Changed
### Removed
### Fixed
- Crash when using drag n' drop if a button file was loaded (instead of using the toolbar), although this installation method is no longer supported.

## [1.8.0] - 2023-03-08
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.7.1] - 2023-03-04
### Added
### Changed
- UI: png icons now use a dark-mode version (if available) or get inverted according to the button text color configuration.
### Removed
### Fixed

## [1.7.0] - 2023-03-04
### Added
### Changed
- UI: tweaked and unified buttons weight and margins, adjusted to scale set and DPI.
- UI: minor improvements to readme sub-folders names.
- UI: cursor now changes when over a button.
- UI: cursor now changes while performing buttons drag n' drop. It now clearly indicates when a move is allowed or it's outside the allowed range.
- UI: drag n' drop now only works when the mouse is over a button position. i.e. both the functionality and position rectangle are disabled if the mouse is not on a valid position. Previously moving the button to a blank part of the bar would have simply sent it to the first/last position for ex. This is disallowed now, which makes drag n' drop a bit more intuitive and offers an overall more cohesive experience. It also respects orientation and reflow settings.
- Internal code cleanup of menus.
### Removed
### Fixed
- UI: minor improvements to drag n drop behavior when mouse remains static and R. Click is released. Panel is redrawn immediately instead of waiting to move the mouse, current button remains hovered.
- UI: minor improvements to drag n drop behavior when R. Click menu is called in rapid succession. Panel is redrawn on the background now.
- Console: logging of null value not working properly (totally irrelevant except for debug purposes).

## [1.6.0] - 2023-02-22
### Added
- UI: default fonts (buttons, icons, toolbar text and tooltip) may now be changed at '[foobar profile]\js_data\presets\global\globFonts.json'.
### Changed
- UI: improved compatibility with some fonts under Unix systems (using Wine). Sometimes weird chars appeared on menu entries.
### Removed
### Fixed

## [1.5.2] - 2023-02-21
### Added
### Changed
- Helpers: updated helpers
### Removed
### Fixed
- Buttons: properties were sometimes reset/mixed/not saved properly moving buttons using the 'Change buttons position' menu. It worked fine using drag n' drop though.

## [1.5.1] - 2023-02-19
### Added
- UI: added settings for buttons color (the border and filling).
- UI: added settings for buttons transparency (the filling).
### Changed
- UI: enhanced colors and shading for buttons on mouse over/down when using custom toolbar color modes, etc.
- UI: pressing Ctrl resets selected setting on buttons bar colors submenu.
- Helpers: updated helpers
### Removed
### Fixed
- Buttons: fixed 'Restore default buttons' entry crash (not needed anymore since there are no more 'default buttons'), now replaced with 'Restore all buttons' (which simply restores back default settings for every button).
- Readmes: added missing 'Toolbar' readme.

## [1.5.0] - 2023-02-15
### Added
- Volume: new option to set default volume per device. Switching between devices will adjust volume to this setting afterwards.
- UI: added icons-only mode for toolbar buttons at the toolbar configuration menu ('Other UI configuration'). Tooltip is adjusted to show the button's name there instead. Handy when creating a compact toolbar and icons are good enough to recognize the tools.
### Changed
- Playback: workaround for some instances where the output devices throws an error and playback is stopped. Now playback is resumed again.
- Playback: workaround for random instances where playback changes to beginning of track after device switching (foobar bug?). Now playback is forced at cached position after device switching. Multiple retries. Both changes should produce much smoother (and faster) output device switching now.
- Buttons: default method of installation requires now to load the toolbar (no more single buttons support), from there, any button can be loaded as desired.
- Buttons: the buttons bar now shows a message when no buttons have been added, left clicking shows a popup with available buttons presets. Right clicking opens the menu to configure the toolbar or add buttons manually.
- Buttons: improved 'no background mode' on buttons toolbar with colors and shades adapted to the toolbar background color and following the design of native Foobar2000 buttons for a seamless integration.
- Buttons: improved 'no background mode' on buttons toolbar with proper animations (no longer a bad looking rectangle gradient).
- UI: unified tooltip structure and available info on all buttons (short description + relevant settings + keyboard modifiers).
- UI: unified buttons size normalization settings and behavior for all axis modes. 
- UI: unified button icon alignment on reflow modes.
- Helpers: updated helpers.
### Removed
### Fixed
- UI: don't show tooltip during buttons drag n drop.
- UI: background color mismatch when resizing windows and using custom background colors.
- UI: fixed reflow mode in some cases when resizing back to the required width/height to show all buttons on a single row/column.
- UI: fixed reflow mode in some cases when normalization mode was not active and buttons had different size; non needed empty space was added in some rows/columns.

## [1.4.0] - 2022-08-22
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.3.1] - 2022-08-21
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed
- Logging: fixed console logging to file (lines were not being split properly).

## [1.3.0] - 2022-08-12
### Added
### Changed
- Logging: reworked console logging to group buttons loading info into one line.
- Helpers: updated helpers.
- Helpers: switched all callbacks to [event listeners](https://github.com/regorxxx/Callbacks-Framework-SMP).
### Removed
### Fixed
- Workaround for some instances where the scripts would warn about some feature not being supported by the OS (due to an OS or SMP bug).

## [1.2.5] - 2022-08-09
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed
- Buttons: crash when trying to move a button when only a single button script was loaded on the panel.

## [1.2.4] - 2022-08-05
### Added
### Changed
- UI: themed buttons are replaced with manually drawn buttons when the first method fails (on Wine for ex.). Console will output: "window.CreateThemeManager('Button') failed, using experimental buttons" in such case.
- UI: enforced SMP version checking via popups.
- Readmes: rewritten readmes to avoid line wrapping wen showing them within popup for a cleaner presentation.
- Helpers: temp files are now written at 'js_data\temp' instead of 'js_data'.
- Helpers: updated helpers.
### Removed
### Fixed
- UI: crash due to themed buttons not being available on wine.

## [1.2.3] - 2022-05-23
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.2.2] - 2022-05-04
### Added
### Changed
- Helpers: updated helpers.
### Removed
### Fixed

## [1.2.1] - 2022-04-13
### Added
### Changed
- Icon: icon is shown with a different color when Auto-device is enabled. Works like a on/off light indicator.
- Menu: new menu entry to enable/disable the auto-device functionality globally.
- Menu: entry to add new devices is now disabled when there is no file (instead of creating it silently).
- Helpers: updated helpers.
### Removed
### Fixed
- Helpers: avoid file reading crashing in any case (even if it's locked by another process).
- Helpers: fixed UI slowdowns when required font is not found (due to excessive console logging). Now a warning popup is shown and logging is only done once per session.
- UI: Icon was not being updated after enabling/disabling the script until panel was redrawn on mouse over.
- Properties were not being properly renumbered on some cases when moving buttons.

## [1.2.0] - 2022-03-02
### Added
- New option to force device selection by priority on startup. Enabled by default.
- Buttons bar: menu entry to change buttons scale (for high resolution screens or non standard DPI settings).
- Buttons bar: menu entry to enable/disable properties ID on buttons' tooltip.
- Buttons bar: menu entry to change toolbar orientation: Horizontal / Vertical.
- Buttons bar: menu entry to change how max button size is set according to the orientation.
- Buttons bar: buttons can now be freely moved clicking and holding the right mouse button while moving them. This is equivalent to using the menu entry to change buttons position.
- Buttons bar: menu entry to place buttons on new rows / columns if they fill the entire width or height of the panel. Does not require a reload of the panel.
### Changed
- Helpers: updated helpers.
- Entry to add devices to json file is now greyed out when there are no new devices to add.
- General cleanup of code and json file formatting.
- Removed all code and compatibility checks for SMP <1.4.0.
### Removed
### Fixed
- Buttons bar: menu entry to change buttons position was not working properly.
- Helpers: file deletion failed when file was read-only.

## [1.1.1] - 2021-12-23
### Added
### Changed
- Buttons: the list of buttons when adding a new one is now split by categories to easily found them according to their functionality. Same with their readme popup.
- Helpers: updated.
### Removed
### Fixed

## [1.1.0] - 2021-10-14
### Added
- New menu entry 'Add new devices to list' which adds any non present device to the list of available options. This can be used as workaround instead of connecting all devices which will be used to create the complete list, adding devices on demand in an incremental way... much easier than recreating the entire list whenever a change has to be made.
### Changed
- Helpers: additional checks at json loading on all scripts. Warnings via popup when a corrupted file is found.
### Removed
### Fixed
- Fixed crash when loading corrupt devices json file. Now warns about it with a popup.

## [1.0.1] - 2021-10-10
### Added
### Changed
### Removed
### Fixed
- Added missing helper.

## [1.0.0] - 2021-09-10
### Added
- First release.
### Changed
### Removed
### Fixed

[Unreleased]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.13.1...HEAD
[1.13.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.13.0...v1.13.1
[1.13.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.11.1...v1.12.0
[1.11.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.11.0...v1.11.1
[1.11.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.7...v1.10.0
[1.9.7]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.6...v1.9.7
[1.9.6]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.5...v1.9.6
[1.9.5]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.4...v1.9.5
[1.9.4]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.3...v1.9.4
[1.9.3]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.2...v1.9.3
[1.9.2]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.1...v1.9.2
[1.9.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.9.0...v1.9.1
[1.9.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.7.1...v1.8.0
[1.7.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.5.2...v1.6.0
[1.5.2]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.5.1...v1.5.2
[1.5.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.5...v1.3.0
[1.2.5]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/regorxxx/Device-Priority-SMP/compare/43d0aea...v1.0.0
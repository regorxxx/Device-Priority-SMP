# Changelog

## [Table of Contents]
- [Unreleased](#unreleased)
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

[Unreleased]: https://github.com/regorxxx/Device-Priority-SMP/compare/v1.3.0...HEAD
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

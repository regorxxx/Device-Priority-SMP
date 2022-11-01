'use strict';
//01/10/22

/* 
	Output device priority
	----------------
	Auto-switch according to device priority
 */

include('..\\helpers\\buttons_xxx.js'); 
include('..\\helpers\\helpers_xxx.js');
include('..\\helpers\\helpers_xxx_file.js');
include('..\\helpers\\menu_xxx.js');
include('..\\helpers\\callbacks_xxx.js');
var prefix = 'dp_';

try {window.DefinePanel('Output device priority button', {author:'XXX', version: '1.5.0'});} catch (e) {/* console.log('Output device priority Button loaded.'); */} //May be loaded along other buttons

checkCompatible('1.6.1', 'smp');
checkCompatible('1.4.0', 'fb');

prefix = getUniquePrefix(prefix, ''); // Puts new ID before '_'
var newButtonsProperties = { //You can simply add new properties here
	bStartup:	['Force device at startup?', true, {func: isBoolean}, true],
	bEnabled:	['Auto-device enabled?', true, {func: isBoolean}, true],
	refreshRate:['Check devices every X ms (0 to disable)', 600, {func: isInt, range: [[0, 0], [50, Infinity]]}, 600],
};
setProperties(newButtonsProperties, prefix, 0); //This sets all the panel properties at once
newButtonsProperties = getPropertiesPairs(newButtonsProperties, prefix, 0);
buttonsBar.list.push(newButtonsProperties);

const devicesFile = folders.data + 'devices.json';
const devicesPriorityFile = folders.data + 'devices_priority.json';

addButton({
	'Output device priority': new themedButton({x: 0, y: 0, w: 98, h: 22}, 'Auto-device', function () {
		const size = 5;
		const menu = new _menu();
		menu.newEntry({entryText: 'Device priority:', func: null, flags: MF_GRAYED});
		menu.newEntry({entryText: 'sep'});
		menu.newEntry({entryText: 'Export device list' + (_isFile(devicesFile) ?  '\t(overwrite)' : '\t(new)'), func: () => {
			fb.ShowPopupMessage('File is exported at:\n' + devicesFile + '\n\nExport first the device list with all the desired devices connected to use them at a later point (even if the devices are not connected).\n\n\'Set Device X\' menus will only show either currently connected devices or the ones from the exported list.\n\nIn other words, you can only assign devices to the priority list if they are available on the menus. A disconnected device, not available on the exported list, will be shown as \'Not connected device\', with its name at top. Functionality will be the same (for auto-switching purposes) but it will not be on the list of available devices, nor clickable (so you will not be able to set it to another position unless you connect it first).', 'Output device priority');
			const listExport = JSON.parse(fb.GetOutputDevices()); // Reformat with tabs
			if (!_save(devicesFile, JSON.stringify(listExport, null, '\t'))) {console.log('Output device priority: file saving failed (' + devicesFile + ')');}
		}});
		{
			let options;
			const toAdd = [];
			const bFile = _isFile(devicesFile);
			if (bFile) {
				const newDevices = JSON.parse(fb.GetOutputDevices()); // Reformat with tabs
				options = _jsonParseFileCheck(devicesFile, 'Devices list', 'Output device priority', utf8);
				if (options) {
					newDevices.forEach((newDev) => {
						if (!options.some((oldDev) => {return oldDev.device_id === newDev.device_id || oldDev.name === newDev.name;})) {
							toAdd.push(newDev);
						}
					});
				}
			}
			menu.newEntry({entryText: 'Add new devices to list' + (bFile ? (toAdd.length ? '' : '\t-no new devices-') : '\t(export first)'), func: () => {
				fb.ShowPopupMessage('File is exported at:\n' + devicesFile + '\n\nAdds any device currently attached to the list if it\'s not present (no duplicates). Option is only available after exporting the list at least once.', 'Output device priority');
				if (!options) {return;}
				toAdd.forEach((newDev) => {options.push(newDev);});
				if (!_save(devicesFile, JSON.stringify(options, null, '\t'))) {console.log('Output device priority: file saving failed (' + devicesFile + ')');}
				else {console.log('Output device priority: no new devices added.');}
			}, flags: toAdd.length && bFile ? MF_ENABLED : MF_GRAYED});
		}
		menu.newEntry({entryText: 'sep'})
		menu.newEntry({entryText: 'Enable Auto-Device?', func: () => {
			this.buttonsProperties.bEnabled[1] = !this.buttonsProperties.bEnabled[1];
			overwriteProperties(this.buttonsProperties);
			this.switchActive();
			if (this.buttonsProperties.bEnabled[1]) {
				if (devicePriority.refreshRate !== 0) {devicePriority.refreshFuncId = devicePriority.refreshFunc();}
				addEventListener('on_output_device_changed', devicePriority.callbackFunc);
			} else {
				if (devicePriority.refreshRate !== 0) {clearInterval(devicePriority.refreshFuncId);}
				removeEventListener('on_output_device_changed', devicePriority.callbackFunc);
			}
		}});
		menu.newCheckMenu(void(0), 'Enable Auto-Device?', void(0), () => {return this.buttonsProperties.bEnabled[1];});
		menu.newEntry({entryText: 'Force on startup', func: () => {
			this.buttonsProperties.bStartup[1] = !this.buttonsProperties.bStartup[1];
			overwriteProperties(this.buttonsProperties);
		}});
		menu.newCheckMenu(void(0), 'Force on startup', void(0), () => {return this.buttonsProperties.bStartup[1];});
		menu.newEntry({entryText: 'sep'})
		const subMenuName = [];
		const options = _isFile(devicesFile) ? _jsonParseFileCheck(devicesFile, 'Devices list', 'Output device priority', utf8) : JSON.parse(fb.GetOutputDevices());
		const optionsName = [];
		const file = _isFile(devicesPriorityFile) ? _jsonParseFileCheck(devicesPriorityFile, 'Priority list', 'Output device priority', utf8) : null;
		const priorityList = file ? file : [...Array(size)].map(() => {return {name: null, device_id: null};});
		range(1, size, 1).forEach((idx) => {
			subMenuName.push(menu.newMenu('Set Device ' + idx));
			const currMenu = subMenuName[idx - 1];
			const currEntry = priorityList[idx - 1];
			const currDev = currEntry.hasOwnProperty('name') ? currEntry.name : null;
			const currDevR = currDev ? currDev.replace('DS :', '').replace('ASIO :', '') : '';
			{	// Header
				menu.newEntry({menuName: currMenu, entryText: 'Current device: ' + (currDev ? (currDevR.length > 20 ? currDevR.substring(0,20) + ' ...' : currDevR) : '-') , func: null, flags: MF_GRAYED});
				menu.newEntry({menuName: currMenu, entryText: 'sep'});
			}
			{	// Volume
				const currVol = currDev && currEntry.hasOwnProperty('volume') ? currEntry.volume : null;
				menu.newEntry({menuName: currMenu, entryText: 'Set default volume' + '\t' + _b(currVol !== null ? 100 + currVol : 'default') , func: () => {
					let input;
					try {
						input = utils.InputBox(window.ID, 'Input volume value (from 0 to 100):\n(Empty to not change volume)', 'Output device priority', currVol !== null ? 100 + currVol : '', true);
						if (input === '') {input = null;}
						if (input !== null) {input = -100 + Math.abs(Number(input));}
					} catch(e) {return;}
					if (input === currVol) {return;}
					priorityList[idx - 1].volume = input;
					if (!_save(devicesPriorityFile, JSON.stringify(priorityList, null, '\t'))) {console.log('Output device priority: file saving failed (' + devicesPriorityFile + ')');}
				}, flags: currDev ? MF_ENABLED : MF_GRAYED});
				menu.newEntry({menuName: currMenu, entryText: 'sep'});
			}
			{	// Device list
				[{name: 'None'}, {name: 'Not connected device'}, {name: 'sep'}, ...options].forEach( (entry, index) => {
					// Create names for all entries
					if (entry.name === 'sep') {
						menu.newEntry({menuName: currMenu, entryText: 'sep'});
						optionsName.push(entry.name);
					}
					else {
						let deviceName = entry.name;
						deviceName = deviceName.length > 40 ? deviceName.substring(0,40) + ' ...' : deviceName;
						// Entries
						optionsName.push(deviceName);
						menu.newEntry({menuName: currMenu, entryText: deviceName, func: () => {
							priorityList[idx - 1] = entry.name !== 'None' ? {name: entry.name, device_id: entry.device_id} : {name: null, device_id: null};
							if (!_save(devicesPriorityFile, JSON.stringify(priorityList, null, '\t'))) {console.log('Output device priority: file saving failed (' + devicesPriorityFile + ')');}
						}, flags: index === 1 ? MF_GRAYED : MF_ENABLED});
					}
				});
				menu.newCheckMenu(currMenu, optionsName[0], optionsName[optionsName.length - 1],  () => {
					const currOption = currEntry.hasOwnProperty('name') ? currEntry.name : null;
					const id = currOption && currOption.length ? options.findIndex((item) => {return item.name === currOption}) : 0;
					return (id !== -1 ? (id !== 0 ? id + 2 : 0) : 1);
				});
			}
		});
		menu.btn_up(this.currX, this.currY + this.currH);
	}, null, void(0), () => {return 'Set output device priority for auto-switching.\nTo bypass auto-switch SHIFT must be pressed!';}, prefix, newButtonsProperties, chars.headphones),
});

// Default state
buttonsBar.buttons['Output device priority'].active = buttonsBar.buttons['Output device priority'].buttonsProperties.bEnabled[1];
// Helpers
const devicePriority = {
	nowPlaying: {time: -1, plsIdx: -1, itemIdx: -1, handle: null}, 
	bOmitCallback: false, 
	referenceDevices: fb.GetOutputDevices(),
	refreshRate: buttonsBar.buttons['Output device priority'].buttonsProperties.refreshRate[1],
	refreshFunc: repeatFn(() => {
			const newDevices = fb.GetOutputDevices();
			if (newDevices !== devicePriority.referenceDevices) {cacheNowPlaying(); outputDevicePriority();}
	}, buttonsBar.buttons['Output device priority'].buttonsProperties.refreshRate[1]),
	refreshFuncId: null,
	callbackFunc: () => {
		if (!devicePriority.properties.bEnabled[1]) {removeEventListenerSelf();}
		if (devicePriority.bOmitCallback) {devicePriority.bOmitCallback = false; return;}
		cacheNowPlaying();
		outputDevicePriority();
	},
	properties: buttonsBar.buttons['Output device priority'].buttonsProperties,
};
function outputDevicePriority() { 
	if (utils.IsKeyPressed(VK_SHIFT)) {return;}
	if (!devicePriority.properties.bEnabled[1]) {return;}
	const priorityList = _isFile(devicesPriorityFile) ? _jsonParseFileCheck(devicesPriorityFile, 'Priority list', 'Output device priority', utf8) || [] : [];
	if (!priorityList.length) {return;}
	devicePriority.referenceDevices = fb.GetOutputDevices();
	const devices =  JSON.parse(devicePriority.referenceDevices);
	let bDone = false;
	priorityList.forEach( (device) => {
		if (typeof device !== 'object' || !device.hasOwnProperty('name')) {return;}
		if (bDone) {return;}
		const idx = devices.findIndex((dev) => {return dev.name === device.name || dev.device_id === device.device_id;});
		if (idx !== -1) {
			const currDevice = devices[idx];
			if (currDevice.active) {bDone = true; return;}
			devicePriority.bOmitCallback = true;
			fb.SetOutputDevice(currDevice.output_id, currDevice.device_id);
			console.log('Auto-Switch output device to: ', device.name, device.device_id);
			if (device.hasOwnProperty('volume') && device.volume !== null && fb.Volume !== device.volume) {
				fb.Volume = device.volume;
				console.log('Auto-Switch volume to: ' + (100 + fb.Volume));
			}
			if (fb.IsPaused) {fb.PlayOrPause();} // Workaround for Bluetooth devices pausing on power off
			// Try to fix playback
			[50, 100, 150, 200, 250, 300].forEach((ms, i) => {setTimeout(fixNowPlaying, ms, i + 1);});
			bDone = true;
		}
	});
	if (!bDone) {console.log('Output device priority: No devices matched the priority list.');}
}

function cacheNowPlaying() {
	if (fb.IsPlaying) {
		const playingItem = plman.GetPlayingItemLocation();
		devicePriority.nowPlaying.time = -1;
		devicePriority.nowPlaying.plsIdx = -1;
		devicePriority.nowPlaying.itemIdx = -1;
		devicePriority.nowPlaying.handle = fb.GetNowPlaying();
		if (devicePriority.nowPlaying.handle && playingItem.IsValid) {
			devicePriority.nowPlaying.plsIdx = playingItem.PlaylistIndex;
			devicePriority.nowPlaying.itemIdx = playingItem.PlaylistItemIndex;
			devicePriority.nowPlaying.time = fb.PlaybackTime
		}
	}
}

function fixNowPlaying(i) {
	// Workaround for Bluetooth devices pausing on power off
	if (fb.IsPaused) {fb.PlayOrPause();}
	// It was playing and something went wrong (like device not available)
	if ((!fb.IsPlaying || fb.PlaybackTime < devicePriority.nowPlaying.time) && devicePriority.nowPlaying.handle !== null) {
		if (devicePriority.nowPlaying.plsIdx !== -1 && devicePriority.nowPlaying.plsIdx < plman.PlaylistCount) {
			const cache = {plsIdx: plman.ActivePlayist, itemIdx: plman.GetPlaylistFocusItemIndex(plman.ActivePlayist)};
			let bChanged = false;
			if (devicePriority.nowPlaying.plsIdx !== plman.ActivePlayist) {
				plman.ActivePlayist = devicePriority.nowPlaying.plsIdx;
				plman.SetPlaylistFocusItem(devicePriority.nowPlaying.plsIdx, devicePriority.nowPlaying.itemIdx);
				bChanged = true;
			} else if (cache.itemIdx !== devicePriority.nowPlaying.itemIdx) {
				plman.SetPlaylistFocusItem(devicePriority.nowPlaying.plsIdx, devicePriority.nowPlaying.itemIdx);
				bChanged = true;
			}
			fb.PlaybackTime = devicePriority.nowPlaying.time;
			if (!fb.IsPlaying) {fb.Play();}
			if (bChanged) {
				plman.ActivePlayist = cache.plsIdx;
				plman.SetPlaylistFocusItem(cache.plsIdx, cache.itemIdx);
			}
			console.log('Output device priority: fixed playback at ' + i + ' retry.')
		}
	}
}

// Startup
if (devicePriority.properties.bEnabled[1]) {
	// Add callback
	addEventListener('on_output_device_changed', devicePriority.callbackFunc);
	// Check device on startup
	if (devicePriority.properties.bStartup[1]) {outputDevicePriority();}
	// Listen to new devices connection
	if (devicePriority.refreshRate !== 0) {devicePriority.refreshFuncId = devicePriority.refreshFunc();}
}
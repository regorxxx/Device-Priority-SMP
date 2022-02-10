'use strict';
//10/02/22

/* 
	Output device priority
	----------------
	Auto-switch according to device priority
 */

include('..\\helpers\\buttons_xxx.js'); 
include('..\\helpers\\helpers_xxx.js');
include('..\\helpers\\helpers_xxx_file.js');
include('..\\helpers\\menu_xxx.js');
var prefix = 'dp_';

try { //May be loaded along other buttons
	window.DefinePanel('Output device priority button', {author:'XXX', version: '1.1.0'});
	var g_font = _gdiFont('Segoe UI', 12);
	var buttonCoordinates = {x: 0, y: 0, w: 98, h: 22};
} catch (e) {
	buttonCoordinates = {x: 0, y: 0, w: buttonsBar.config.buttonOrientation === 'x' ? 98 : buttonCoordinates.w , h: buttonsBar.config.buttonOrientation === 'y' ? 22 : buttonCoordinates.h}; // Reset 
	console.log('Output device priority Button loaded.');
}

prefix = getUniquePrefix(prefix, '_'); // Puts new ID before '_'
var newButtonsProperties = { //You can simply add new properties here
	bStartup:	['Force device at startup?', true]
};
newButtonsProperties['bStartup'].push({func: isBoolean}, newButtonsProperties['bStartup'][1]);

setProperties(newButtonsProperties, prefix); //This sets all the panel properties at once
buttonsBar.list.push(getPropertiesPairs(newButtonsProperties, prefix));
const devicesFile = folders.data + 'devices.json';
const devicesPriorityFile = folders.data + 'devices_priority.json';

if (_isFile(devicesPriorityFile)) { // TODO: Remove later, for compatibility purpose with old versions
	const priorityList = _jsonParseFileCheck(devicesPriorityFile, 'Devices priority', 'Output device priority', convertCharsetToCodepage('UTF-8'));
	if (priorityList && priorityList.some((device) => {return typeof device !== 'object' || !device.hasOwnProperty('name');})) {
		_deleteFile(devicesPriorityFile);
		fb.ShowPopupMessage('Old devices priority file has been deleted:\n' + devicesPriorityFile + '\nNew script version uses another format {name, device_id}, please recreate it if needed.\n\n' + JSON.stringify(priorityList, null, '\t'), 'Output device priority');
	}
}

var newButtons = {
	menuButton: new SimpleButton(buttonCoordinates, 'Auto-device', function (mask) {
		const properties = getPropertiesPairs(this.buttonsProperties, this.prefix); //This gets all the panel properties at once
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
			if (_isFile(devicesFile)) {
				const newDevices = JSON.parse(fb.GetOutputDevices()); // Reformat with tabs
				options = _jsonParseFileCheck(devicesFile, 'Devices list', 'Output device priority', convertCharsetToCodepage('UTF-8'));
				if (options) {
					newDevices.forEach((newDev, i) => {
						if (!options.some((oldDev) => {return oldDev.device_id === newDev.device_id || oldDev.name === newDev.name;})) {
							toAdd.push(newDev);
						}
					});
				}
			}
			menu.newEntry({entryText: 'Add new devices to list' + (toAdd.length ? '' : '\t-no new devices-'), func: () => {
				fb.ShowPopupMessage('File is exported at:\n' + devicesFile + '\n\nAdds any device currently attached to the list if it\'s not present (no duplicates). Option is only available after exporting the list at least once.', 'Output device priority');
				if (!options) {return;}
				toAdd.forEach((newDev, i) => {options.push(newDev);});
				if (!_save(devicesFile, JSON.stringify(options, null, '\t'))) {console.log('Output device priority: file saving failed (' + devicesFile + ')');}
				else {console.log('Output device priority: no new devices added.');}
			}, flags: toAdd.length ?  MF_ENABLED : MF_GRAYED});
		}
		menu.newEntry({entryText: 'sep'})
		menu.newEntry({entryText: 'Force on startup', func: () => {
			properties['bStartup'][1] = !properties['bStartup'][1];
			overwriteProperties(properties);
		}});
		menu.newCheckMenu(void(0), 'Force on startup', void(0), () => {return properties['bStartup'][1];});
		menu.newEntry({entryText: 'sep'})
		const subMenuName = [];
		const options = _isFile(devicesFile) ? _jsonParseFileCheck(devicesFile, 'Devices list', 'Output device priority', convertCharsetToCodepage('UTF-8')) : JSON.parse(fb.GetOutputDevices());
		const optionsName = [];
		const file = _isFile(devicesPriorityFile) ? _jsonParseFileCheck(devicesPriorityFile, 'Priority list', 'Output device priority', convertCharsetToCodepage('UTF-8')) : null;
		const priorityList = file ? file : [...Array(size)].map((_) => {return {name: null, device_id: null};});
		range(1, size, 1).forEach((idx) => {
			subMenuName.push(menu.newMenu('Set Device ' + idx));
			const currMenu = subMenuName[idx - 1];
			const currDev = priorityList[idx - 1].hasOwnProperty('name') ? priorityList[idx - 1].name : null;
			const currDevR = currDev ? currDev.replace('DS :', '').replace('ASIO :', '') : '';
			menu.newEntry({menuName: currMenu, entryText: 'Current device: ' + (currDev ? (currDevR.length > 20 ? currDevR.substring(0,20) + ' ...' : currDevR) : '-') , func: null, flags: MF_GRAYED});
			menu.newEntry({menuName: currMenu, entryText: 'sep'});
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
				const currOption = priorityList[idx - 1].hasOwnProperty('name') ? priorityList[idx - 1].name : null;
				const id = currOption && currOption.length ? options.findIndex((item) => {return item.name === currOption}) : 0;
				return (id !== -1 ? (id !== 0 ? id + 2 : 0) : 1);
			});
		});
		menu.btn_up(this.x, this.y + this.h);
	}, null, g_font, () => {return 'Set output device priority for auto-switching.\nTo bypass auto-switch SHIFT must be pressed!';}, prefix, newButtonsProperties, chars.headphones),
};
// Check if the button list already has the same button ID
for (var buttonName in newButtons) {
	if (buttons.hasOwnProperty(buttonName)) {
		// fb.ShowPopupMessage('Duplicated button ID (' + buttonName + ') on ' + window.Name);
		// console.log('Duplicated button ID (' + buttonName + ') on ' + window.Name);
		Object.defineProperty(newButtons, buttonName + Object.keys(buttons).length, Object.getOwnPropertyDescriptor(newButtons, buttonName));
		delete newButtons[buttonName];
	}
}
// Adds to current buttons
buttons = {...buttons, ...newButtons};

// Helpers
let referenceDevices = fb.GetOutputDevices();
repeatFn(() => {
	const newDevices = fb.GetOutputDevices();
	if (newDevices !== referenceDevices) {referenceDevices = newDevices; outputDevicePriority();}
}, 600)();

function outputDevicePriority() { 
	if (utils.IsKeyPressed(VK_SHIFT)) {return;}
	const priorityList = _isFile(devicesPriorityFile) ? _jsonParseFileCheck(devicesPriorityFile, 'Priority list', 'Output device priority', convertCharsetToCodepage('UTF-8')) || [] : [];
	if (!priorityList.length) {return;}
	const devices =  JSON.parse(fb.GetOutputDevices());
	let bDone = false;
	priorityList.forEach( (device) => {
		if (typeof device !== 'object' || !device.hasOwnProperty('name')) {return;}
		if (bDone) {return;}
		const idx = devices.findIndex((dev) => {return dev.name === device.name || dev.device_id === device.device_id;});
		if (idx !== -1) {
			if (devices[idx].active) {bDone = true; return;}
			fb.SetOutputDevice(devices[idx].output_id, devices[idx].device_id); 
			console.log('Auto-Switch output device to: ', device.name, device.device_id);
			if (fb.IsPaused) {fb.PlayOrPause();} // Workaround for Bluetooth devices pausing on power off
			bDone = true;
		}
	});
	if (!bDone) {console.log('Output device priority: No devices matched the priority list.');}
}
if (typeof on_output_device_changed !== 'undefined') {
	const oldFunc = on_output_device_changed;
	on_output_device_changed = function() {
		oldFunc();
		outputDevicePriority();
	}
} else {var on_output_device_changed = outputDevicePriority;}

// Startup
if (buttonsBar.list[buttonsBar.list.length - 1]['bStartup'][1]) {outputDevicePriority();}
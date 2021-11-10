let scanController;

function openScanner() {
	console.info("opening scanner controller");
	scanController = Alloy.createController("scanner");
	$.scannerWrapper.add(scanController.getView());
}

function closeScanner() {
	console.error("closing scanner controller");

	scanController.close();
	$.scannerWrapper.removeAllChildren();
	scanController = null;
}

$.index.open();

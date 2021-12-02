const scanditAPIKey = "AfBQMWVBRNwJQknf5zRcvVM9o+aWQobnCUp/RaYUIsm8cnD/213Rlqt9hcQCC2fw1TW/LbR2dUzBca1dW0AA9xhG/yzvSEjbGSIGwWZc853qcODLBz/eBH9RSkAFQP/dK2DMs1RXhReqZYeL5nIvZudoUx6pbhz7zXYF3plculkAcIOEp2/k1HMpMUIsQm4XtG+zhWBPb+IbQ/raeUiF6o19QH/lZjHF1WvSSApRWFHgaSwnPHzYUPBIwMn6Zb/9dEI6MMtNvlTKd6Y7snSgChVEMiOSdS2l3FjzGalRfmhOQuSQQ27uAi9fEYaMftxJ3C7eNIVml9XncrucrFDBw6QWQiFgQDtM1HycJURBQ0EFd8WUxmLoasVSJDqqUyFyz2sluf1tEYqGdotT23w/E5x/O1f5fwC3p2xBi7lqOmXeUnvBBWPfJodWI7qTdl5OJG/ysPhlg1zTFwq9hHDSdldb67dhS0zQ2nYusUtdkSVSV29WyE2chKVW9SSlL3CTNRTF+Bszq85TRMKbwzizN0Qz8yahKEjYWQJn8wZCiornwv2gN8GX/dUDp3G/KFNFrXEtw7w+JWXfehdmiTRYkbEZ0aLdpPslBews7XrRGyVqgyguBSkReKJjJWim4hNGHypbgFjHrI/nV/M3czfvBDqJwr4ba4jsmk+APONOTZzQDhjkUMiQeNVvzcMMoP3H7DYO38LMSLOMJE95ANC9lFYmQuzDyZ45fnvDBx26EL65OKDA8WdxLvzyQUunhMSAgnYTeQW/VFWtf8hzf/n6Anu1TqrCDwNG3fMbRCAB06Q9ke5pXyNwaBLvnHtvKwAhlSUGuX3mwnIJwoHKOxHgEaS6rInoaWFGAWXikBChcSXGKZi+1y+8IW9bMBHJfWwpC2U+rjE7RwRjm+dYLf1Ek4l7tqT1CDvg7pP6h36asX/17tcdKNl/93qaOQxJAjwXwOslBjzYWDjU4G5uelljoBHWwWgImwaVt52nHYnk/tXUso8Jy4YJeflbCBiL6X1RrBbwnjEOHqsAf2HoVz0uj5UtRHyuN1a3kHGefYBOYvVevqLIw/Q4T3b7zLRcZrX4blD9TtqJq6O6PwjfugWZEJMjkwxP3TQv9lnfcpTN13J6ObIcBJxIjQH/whNs8D7R4s0ZnXKjKKVm/9pf1oZo1tLsw2ogOdilAsmDAszFKj8+Uf+8nxx/Uw7O2UhziqOW";

var ScanditCore = require('scandit-titanium-datacapture-core');
var ScanditBarcode = require('scandit-titanium-datacapture-barcode');
var scanditContext;
var scanditBarcodeCapture;
var scanditCamera;
var scanditBarcodeCaptureListener;
var scanditTorchControl;

exports.close = function() {
  console.error("in scanner close!");

  /** memory management test */
  scanditBarcodeCapture.isEnabled = false;
  scanditCamera.switchToDesiredState(ScanditCore.FrameSourceState.Off);
  scanditBarcodeCapture.removeListener(scanditBarcodeCaptureListener);
  
  scanditContext.dispose();
  
  $.scannerContainer.removeAllChildren();

  scanditListener = null;
  scanditTorchControl = null;
  scanditContext = null;
  ScanditBarcode = null;
  ScanditCore = null;

  $.destroy();
  $.off();
};

function instantiateScanner() {
  scanditContext = ScanditCore.DataCaptureContext.forLicenseKey(scanditAPIKey);

  const settings = new ScanditBarcode.BarcodeCaptureSettings();
	settings.enableSymbologies([
			ScanditBarcode.Symbology.EAN13UPCA,
	]);
	settings.codeDuplicateFilter = 500;
  settings.settingsForSymbology(ScanditBarcode.Symbology.EAN13UPCA).setExtensionEnabled("remove_leading_upca_zero", true);

  const selectionSize = new ScanditCore.SizeWithUnit(
    new ScanditCore.NumberWithUnit(0.9, ScanditCore.MeasureUnit.Fraction),
    new ScanditCore.NumberWithUnit(0.05, ScanditCore.MeasureUnit.Fraction),
  );
  settings.locationSelection = ScanditCore.RectangularLocationSelection.withSize(selectionSize);

  scanditBarcodeCapture = ScanditBarcode.BarcodeCapture.forContext(scanditContext, settings);

  scanditBarcodeCaptureListener = {
		didScan: (barcodeCapture, session) => {
			const recognizedBarcodes = session.newlyRecognizedBarcodes;
			console.warn("recognized barcodes count: " + recognizedBarcodes.length);
			console.info("barcode: " + recognizedBarcodes[0]._data);
		}
	};
	scanditBarcodeCapture.addListener(scanditBarcodeCaptureListener);

  const cameraSettings = ScanditBarcode.BarcodeCapture.recommendedCameraSettings;
	scanditCamera = ScanditCore.Camera.default;

  if (scanditCamera) {
		scanditCamera.applySettings(cameraSettings);
	}

	scanditContext.setFrameSource(scanditCamera);
	scanditCamera.switchToDesiredState(ScanditCore.FrameSourceState.Off);
  scanditCamera.switchToDesiredState(ScanditCore.FrameSourceState.On);
  scanditBarcodeCapture.isEnabled = true;

  const dataCaptureView = new ScanditCore.DataCaptureView(scanditContext);
  scanditTorchControl = new ScanditCore.TorchSwitchControl();
  dataCaptureView.addControl(scanditTorchControl);

  dataCaptureView.addToContainer($.scannerContainer);

  ScanditBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForView(scanditBarcodeCapture, dataCaptureView);
}

if (Ti.Media.hasCameraPermissions()) {
  instantiateScanner();
} else {
  Ti.Media.requestCameraPermissions(function(e) {
    if (e.success) {
      instantiateScanner();
    }
  });
}

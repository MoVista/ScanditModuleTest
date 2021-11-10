const scanditAPIKey = "YOUR API KEY GOES HERE!";

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
  // scanditBarcodeCapture.isEnabled = false;
  // scanditCamera.switchToDesiredState(ScanditCore.FrameSourceState.Off);
  // scanditBarcodeCapture.removeListener(scanditBarcodeCaptureListener);
  // $.scannerContainer.removeAllChildren();

  // scanditListener = null;
  // scanditTorchControl = null;
  // scanditContext = null;
  // ScanditBarcode = null;
  // ScanditCore = null;

  // $.destroy();
  // $.off();
};

function instantiateScanner() {
  scanditContext = ScanditCore.DataCaptureContext.forLicenseKey(scanditAPIKey);
  const settings = new ScanditBarcode.BarcodeCaptureSettings();
	settings.enableSymbologies([
			ScanditBarcode.Symbology.EAN13UPCA,
	]);
	settings.codeDuplicateFilter = 500;

  scanditBarcodeCapture = ScanditBarcode.BarcodeCapture.forContext(scanditContext, settings);
  scanditBarcodeCaptureListener = {
		didScan: (barcodeCapture, session) => {
			const recognizedBarcodes = session.newlyRecognizedBarcodes;
			console.warn("recognized barcodes count: " + recognizedBarcodes.length);

			console.info("typeof recognizedBarcodes[0]._data: " + typeof recognizedBarcodes[0]._data);
			console.info("untrimmed barcode: " + recognizedBarcodes[0]._data);
			console.info("trimmed barcode: " + recognizedBarcodes[0]._data.substring(1, recognizedBarcodes[0]._data.length));
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

  // const overlay = ScanditBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForView(scanditBarcodeCapture, $.scannerContainer); // errors out with a "view.addOverlay is not a function" error
  // dataCaptureView.addOverlay(overlay); // throws the same error as above
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

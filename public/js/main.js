function copyToClipboard(inputId) {
  var copyText = document.getElementById(inputId);
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);
}

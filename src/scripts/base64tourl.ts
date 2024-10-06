function base64ToBlob(base64: string): Blob {
  const base64ImageData = base64;
  const filetype = base64ImageData.split("data:")[1].split(";")[0];
  const contentType = filetype;
  const byteCharacters = atob(
    base64ImageData.substr(`data:${contentType};base64,`.length)
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export default base64ToBlob;

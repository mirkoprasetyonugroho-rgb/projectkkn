export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'a2ddbca1fb5ef4f2cc5d2211cad107b2';
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  if (result.success && result.data && result.data.url) {
    return result.data.url;
  } else {
    throw new Error(result.error?.message || 'Gagal mengunggah gambar ke imgBB');
  }
};

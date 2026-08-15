export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_IMGBB_API_KEY belum dikonfigurasi di file .env');
  }

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

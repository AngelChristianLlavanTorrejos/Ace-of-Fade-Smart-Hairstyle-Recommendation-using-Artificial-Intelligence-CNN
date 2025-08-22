export class HairstyleRecommendationModel {
  async analyzeFaceShape (file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error(`Response Status: ${res.status}`)
      
      const data = await res.json();

      return data;
    }
    catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}
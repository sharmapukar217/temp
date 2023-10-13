export async function load({ locals }) {
  try {
    const result = await locals.strapi.get(`/api/about`);
    return { 
      success: true,
      about: result.data
    };
    
  } catch (error) {
    return { success: false, message: JSON.stringify(error)}
  }

}
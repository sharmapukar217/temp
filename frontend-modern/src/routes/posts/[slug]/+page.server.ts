import { fail } from "@sveltejs/kit";
import { currentPostID } from "$lib/utilities/stores.js";

export async function load({ params, locals }) {
  try {
    const res = await locals.strapi.get(`/api/slugify/slugs/blog/${params.slug}`, {
      populate: {
        creator: { fields: ["username"] },
        cover_image: { fields: ["url", "mime", "name"]},
        comments: true
      }
    });

    currentPostID.set(res.data.id)
    return { success: true, post: res.data}
    
  } catch (error) {
    return { success: false, message: JSON.stringify(error)}
  }
}


export const actions = {
  comment: async ({ request, locals }) => {
    const data = await request.formData();
    const full_name = data.get("full_name");
    const email = data.get("email");
    const description = data.get("description");

    let currentID = 0;
    currentPostID.subscribe((val) => currentID = val)

    if (!email || !full_name || !description || !currentID || currentID === 0){
      return fail(400, {email, full_name, description, missing: true});
    }

    try {
      const res = await locals.strapi.post(`/api/comments-group`, {
        data: {
          blog: currentID,
          email,
          full_name,
          description
        }
      });

      console.log(res)
  
      return { success: true, post: res}
      
    } catch (error) {
      return { success: false, message: JSON.stringify(error)}
    }
  }
}
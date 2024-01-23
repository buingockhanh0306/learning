export default {
  methods: {
    convertToSlug(text) {
      let slug = text.toLowerCase().trim();
      slug = slug.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a");
      slug = slug.replace(/[éèẻẽẹêếềểễệ]/g, "e");
      slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
      slug = slug.replace(/[úùủũụưứừửữự]/g, "u");
      slug = slug.replace(/[íìỉĩị]/g, "i");
      slug = slug.replace(/[ýỳỷỹỵ]/g, "y");
      slug = slug.replace(/đ/g, "d");
      slug = slug.replace(/[^\w\s]/g, "");
      slug = slug.replace(/\s+/g, "-");

      return "/" + slug;
    },
    getCurrentPath(slug) {
      if (slug === "/admin/") return slug;
      let arrayElements = slug?.split("/");
      return arrayElements.slice(0, 3).join("/") + "/";
    },
  },
};

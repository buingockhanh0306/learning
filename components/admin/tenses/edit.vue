<template>
  <div>
    <Heading text="Chỉnh sửa bài viết" />
    <div class="flex flex-col gap-4 mt-8">
      <div
        class="flex laptop:flex-row laptop:gap-16 mobile:flex-col mobile:gap-4"
      >
        <div class="flex flex-col w-full">
          <TextField
            fieldName="Tiêu đề bài viết"
            placeholder="Vui lòng nhập tiêu đề..."
            v-model="title"
            @blur="handleBlur('title')"
            @input="handleInput('title')"
            :className="errorField.title ? 'is-error' : 'bg-white'"
          />
          <ErrorMessage
            :isDisplayError="!!errorField.title"
            :textError="errorField.title"
          />
        </div>
        <div class="flex flex-col w-full">
          <TextField
            fieldName="Mô tả bài viết"
            placeholder="Vui lòng nhập mô tả..."
            v-model="description"
            @blur="handleBlur('description')"
            @input="handleInput('description')"
            :className="errorField.description ? 'is-error' : 'bg-white'"
          />
          <ErrorMessage
            :isDisplayError="!!errorField.description"
            :textError="errorField.description"
          />
        </div>
      </div>
      <div
        class="flex laptop:flex-row laptop:gap-16 mobile:flex-col mobile:gap-4"
      >
        <TextField
          :isDisable="true"
          fieldName="Slug"
          className="bg-white"
          v-model="slug"
        />
      </div>
      <UploadImage />
      <div class="flex flex-col gap-2 mt-4">
        <span class="font-semibold text-textPrimary">Nội dung bài viết</span>
        <editor
          :api-key="tinyMCEKey"
          v-model="content"
          @onBlur="handleBlur('content')"
          @input="handleInput('content')"
          :init="initEditor"
        />
        <ErrorMessage
          :isDisplayError="!!errorField.content"
          :textError="errorField.content"
        />
      </div>
      <div class="flex justify-end w-full">
        <div class="flex gap-6 laptop:w-1/4 mobile:w-full">
          <Button
            :type="TYPE_BUTTON.RED"
            text="Quay lại"
            @handleClick="handleBack"
          />
          <Button
            text="Cập nhật"
            @handleClick="handleUpdate"
            :className="isDisableButton ? 'is-disable' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "~/components/common/Heading.vue";
import Button from "~/components/common/Button.vue";
import TextField from "~/components/common/TextField.vue";
import Editor from "@tinymce/tinymce-vue";
import { mapActions, mapGetters } from "vuex";
import generate from "~/mixins/generate";
import ErrorMessage from "~/components/common/ErrorMessage.vue";
import { ERROR_MESSAGE, TYPE_BUTTON } from "~/constants/";
import UploadImage from "~/components/common/UploadImage.vue";

export default {
  name: "EditUser",
  layout: "default",
  mixins: [generate],
  components: {
    Heading,
    TextField,
    editor: Editor,
    Button,
    ErrorMessage,
    UploadImage,
  },
  watch: {
    title(value) {
      this.slug = this.convertToSlug(value);
    },
  },
  data() {
    return {
      title: "",
      description: "",
      image: "",
      slug: "",
      content: "",
      tinyMCEKey: process.env.tinyMCEKey,
      TYPE_BUTTON,
      errorField: {
        title: "",
        slug: "",
        description: "",
        image: "",
        content: "",
      },
      initEditor: {
        height: 500,
        menubar: false,
        plugins: [],
        toolbar:
          "undo redo | fontselect | formatselect link image | bold italic underline | fontsizeselect  forecolor backcolor |\
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | help",
      },
      selector: "textarea.tinymce",
    };
  },
  computed: {
    ...mapGetters("admin", ["tenseDetail", "imageUpload"]),
    isDisableButton: {
      get() {
        return !!(
          this.errorField.title ||
          this.errorField.description ||
          this.errorField.content ||
          !this.title ||
          !this.description ||
          !this.content
        );
      },
      set(value) {
        return value;
      },
    },
  },
  async mounted() {
    await this.getTenseById(this.$route.params.id);
    this.title = this.tenseDetail.title;
    this.description = this.tenseDetail.description;
    this.image = await this.getImage(this.tenseDetail.image);
    this.content = this.tenseDetail.content;
    this.setInitImage(this.image);
  },
  methods: {
    ...mapActions("admin", [
      "updateTense",
      "getTenseById",
      "getImage",
      "setInitImage",
    ]),
    ...mapActions(["setNotify"]),
    handleInput(field) {
      this.errorField[field] = "";
      this.isDisableButton = true;
    },
    handleBlur(field) {
      if (!this[field]) {
        this.errorField[field] = ERROR_MESSAGE.FIELD_REQUIRED;
      }
    },
    handleBack() {
      this.$router.push("/admin/tenses/");
    },
    async handleUpdate() {
      try {
        await this.updateTense({
          data: {
            title: this.title,
            slug: this.slug,
            description: this.description,
            image: this.imageUpload,
            content: this.content,
          },
          id: this.$route.params.id,
        });
        this.$router.push("/admin/tenses");
        this.setNotify({
          isOpen: true,
          text: "Cập nhật bài viết thành công",
          type: "success",
        });
      } catch (error) {
        this.setNotify({
          isOpen: true,
          text: "Đã có lỗi xảy ra",
          type: "error",
        });
      }
    },
  },
};
</script>

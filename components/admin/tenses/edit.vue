<template>
  <div>
    <Heading text="Update tense" />
    <div class="flex flex-col gap-4 mt-8">
      <div
        class="flex laptop:flex-row laptop:gap-16 mobile:flex-col mobile:gap-4"
      >
        <div class="flex flex-col w-full">
          <TextField
            fieldName="Title"
            placeholder="Please enter title..."
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
            fieldName="Description"
            placeholder="Please enter description..."
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
      <div class="flex flex-col gap-2 mt-4">
        <span class="font-semibold text-textPrimary">Content</span>
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
            text="Return"
            @handleClick="handleBack"
          />
          <Button
            text="Update"
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
      slug: "",
      content: "",
      tinyMCEKey: process.env.tinyMCEKey,
      TYPE_BUTTON,
      errorField: {
        title: "",
        slug: "",
        description: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters("admin", ["tenseDetail"]),
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
    this.content = this.tenseDetail.content;
  },
  methods: {
    ...mapActions("admin", ["updateTense", "getTenseById"]),
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
            content: this.content,
          },
          id: this.$route.params.id,
        });
        this.$router.push("/admin/tenses");
        this.setNotify({
          isOpen: true,
          text: "Updated successfully!",
          type: "success",
        });
      } catch (error) {
        this.setNotify({
          isOpen: true,
          text: "Some wrong!",
          type: "error",
        });
      }
    },
  },
};
</script>

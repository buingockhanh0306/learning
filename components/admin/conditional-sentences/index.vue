<template>
  <div>
    <Heading text="Conditional Sentences Manager" />
    <div class="flex justify-end mt-8 mb-4">
      <div>
        <Button iconName="add" @handleClick="redirectAddTense" text="Add" />
      </div>
    </div>
    <Table :headers="headers" :dataTable="listConditional" />
    <div class="flex justify-end w-full mt-8">
      <paginate
        v-if="pagination.totalPage > 1"
        :page-count="pagination.totalPage"
        :page-range="3"
        :value="pagination.currentPage"
        :click-handler="handleChangePage"
        prev-text="Prev"
        next-text="Next"
        container-class="pagination"
        page-class="pagination-item"
        prev-class="pagination-prev"
        next-class="pagination-next"
        active-class="pagination-active"
      />
    </div>
  </div>
</template>

<script>
import Table from "~/components/admin/conditional-sentences/Table.vue";
import Button from "~/components/common/Button.vue";
import Heading from "~/components/common/Heading.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserIndex",
  components: {
    Table,
    Button,
    Heading,
  },
  data() {
    return {
      headers: ["No.", "Title", "Slug", "Description", "Options"],
    };
  },
  computed: {
    ...mapGetters("admin", ["listConditional", "pagination"]),
  },
  async mounted() {
    await this.getConditional(this.pagination);
  },
  methods: {
    ...mapActions("admin", [
      "getConditional",
      "deleteConditional",
      "setPagination",
      "updateIrregularVerb",
    ]),
    ...mapActions(["setNotify"]),
    redirectAddTense() {
      this.$router.push("/admin/conditional-sentences/create/");
    },
    async handleChangePage(page) {
      this.setPagination({
        ...this.pagination,
        currentPage: page,
      });
      await this.getConditional(this.pagination);
    },
  },
};
</script>

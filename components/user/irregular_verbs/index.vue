<template>
  <div class="relative">
    <table
      class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-center"
            :class="[
              isMobileScreen &&
                (item === 'Dịch nghĩa' || item === 'STT') &&
                'hidden',
            ]"
            v-for="item in headers"
            :key="item"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="(item, index) in listIrregularVerbs"
          :key="item.id"
        >
          <th
            scope="row"
            class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white mobile:hidden laptop:block"
          >
            {{ (pagination.currentPage - 1) * 10 + index + 1 }}
          </th>
          <td class="px-6 py-4">{{ item.base }}</td>
          <td class="px-6 py-4">{{ item.past }}</td>
          <td class="px-6 py-4">{{ item.past2 }}</td>
          <td class="px-6 py-4 mobile:hidden laptop:block">{{ item.mean }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex w-full mt-8 laptop:justify-between mobile:justify-end">
      <div class="items-center gap-4 mb-8 mobile:hidden laptop:flex">
        <span class="text-sm text-textPrimary">Show: </span>
        <Select :dataSelect="dataSelect" @handleSelect="selectItemPerPage" />
      </div>
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
import { mapGetters, mapActions } from "vuex";
import Select from "~/components/common/Select";
export default {
  name: "IrregularVerbsComponent",
  components: {
    Select,
  },
  data() {
    return {
      dataSelect: [10, 20, 50],
      headers: [
        "STT",
        "Động từ nguyên mẫu",
        "Thì quá khứ",
        "Quá khứ phân từ",
        "Dịch nghĩa",
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["listIrregularVerbs", "pagination"]),
  },
  async mounted() {
    await this.getIrregularVerbs(this.pagination);
  },
  methods: {
    ...mapActions("user", ["getIrregularVerbs", "setPagination"]),
    async handleChangePage(page) {
      this.setPagination({
        ...this.pagination,
        currentPage: page,
      });
      await this.getIrregularVerbs(this.pagination);
    },
    async selectItemPerPage(item) {
      this.setPagination({
        ...this.pagination,
        itemPerPage: item,
      });
      await this.getIrregularVerbs(this.pagination);
    },
  },
};
</script>

<style lang="scss" scoped></style>

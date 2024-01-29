<template>
  <div class="relative">
    <h2
      class="mb-8 text-2xl font-semibold text-center uppercase text-textPrimary"
    >
      Bảng động từ bất quy tắc
    </h2>
    <div
      class="overflow-y-hidden mobile:overflow-x-scroll laptop:overflow-x-hidden"
    >
      <table class="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-center"
              v-for="item in headers"
              :key="item"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-b"
            v-for="(item, index) in listIrregularVerbs"
            :key="item.id"
          >
            <th
              scope="row"
              class="py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ (pagination.currentPage - 1) * 10 + index + 1 }}
            </th>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-3">
                <div class="flex flex-col">
                  <span>{{ item.base }}</span>
                  <span class="text-textHover">/{{ item.baseIPA }}/</span>
                </div>
                <span
                  class="cursor-pointer material-symbols-outlined"
                  :class="
                    textSpeaking === item.base + 'base'
                      ? 'text-textHover'
                      : 'text-textPrimary'
                  "
                  @click="handleSpeak('base', item.base)"
                >
                  volume_up
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-3">
                <div class="flex flex-col">
                  <span>{{ item.past }}</span>
                  <span class="text-textHover">/{{ item.pastIPA }}/</span>
                </div>
                <span
                  class="cursor-pointer material-symbols-outlined"
                  :class="
                    textSpeaking === item.past + 'past'
                      ? 'text-textHover'
                      : 'text-textPrimary'
                  "
                  @click="handleSpeak('past', item.past)"
                >
                  volume_up
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-3">
                <div class="flex flex-col">
                  <span>{{ item.past2 }}</span>
                  <span class="text-textHover">/{{ item.past2IPA }}/</span>
                </div>
                <span
                  class="cursor-pointer material-symbols-outlined"
                  :class="
                    textSpeaking === item.past2 + 'past2'
                      ? 'text-textHover'
                      : 'text-textPrimary'
                  "
                  @click="handleSpeak('past2', item.past2)"
                >
                  volume_up
                </span>
              </div>
            </td>
            <td class="px-6 py-4">{{ item.mean }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="!isSearching"
      class="flex w-full mt-8 laptop:justify-between mobile:justify-end"
    >
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
      textSpeaking: "",
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
    ...mapGetters("user", ["listIrregularVerbs", "pagination", "isSearching"]),
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
    handleSpeak(key, text) {
      responsiveVoice.speak(text, "UK English Male", {
        onstart: () => {
          this.textSpeaking = text + key;
        },
        onend: () => {
          this.textSpeaking = "";
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

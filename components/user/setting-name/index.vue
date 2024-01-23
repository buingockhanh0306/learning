<template>
  <div>
    <h2
      class="text-xl font-semibold text-textPrimary mobile:text-center laptop:text-left"
    >
      Thiết lập họ tên
    </h2>
    <div class="flex flex-col gap-8 mt-12">
      <!-- Cụ ông - cụ bà -->
      <!-- <div class="grid gap-4 mobile:grid-cols-1 laptop:grid-cols-2">
        <TextField
          fieldName="Họ và tên cụ ông"
          placeholder="vd: Bùi Văn A"
          className="border-2"
          v-model="greatGrandfather"
        />
        <TextField
          fieldName="Họ và tên cụ bà"
          placeholder="vd: Lê Thị B"
          className="border-2"
          v-model="greatGrandmother"
        />
      </div> -->

      <!-- Ông nội - bà nội -->
      <!-- <div class="grid gap-4 mobile:grid-cols-1 laptop:grid-cols-2">
        <TextField
          fieldName="Họ và tên ông nội"
          placeholder="vd: Bùi Văn A"
          className="border-2"
          v-model="grandfather"
        />
        <TextField
          fieldName="Họ và tên bà nội"
          placeholder="vd: Lê Thị B"
          className="border-2"
          v-model="grandmother"
        />
      </div> -->

      <!-- Chồng - Vợ -->
      <div class="grid gap-4 mobile:grid-cols-1 laptop:grid-cols-2">
        <TextField
          fieldName="Họ và tên chồng"
          placeholder="vd: Bùi Văn A"
          className="border-2"
          v-model.trim="husband"
        />
        <TextField
          fieldName="Họ và tên vợ"
          placeholder="vd: Lê Thị B"
          className="border-2"
          v-model.trim="wife"
        />
      </div>

      <!-- Con trai - con gái -->
      <div class="grid gap-4 mobile:grid-cols-1 laptop:grid-cols-2">
        <div>
          <div v-for="item in sons" :key="item.id" class="flex flex-col gap-3">
            <div
              class="flex items-center gap-6 laptop:w-3/4 mobile:w-full"
              :class="item.id !== sons[0].id && 'mt-4'"
            >
              <TextField
                :fieldName="item.id === 1 ? 'Họ và tên con trai' : ''"
                placeholder="vd: Bùi Văn A"
                className="border-2"
                :value="item.name"
                @input="(value) => handleInputNameSon(value, item.id)"
              />
              <span
                @click="deleteSon(item)"
                class="cursor-pointer text-textPrimary material-symbols-outlined"
                :class="[
                  item.id === sons[0].id && 'mt-8',
                  sons.length <= 1 && 'text-gray-200 cursor-not-allowed',
                ]"
              >
                delete
              </span>
              <span
                @click="addSon"
                class="cursor-pointer text-textPrimary material-symbols-outlined"
                :class="[
                  item.id === sons[0].id && 'mt-8',
                  sons.length >= 5 && 'text-gray-200 cursor-not-allowed',
                ]"
              >
                add_circle
              </span>
            </div>
          </div>
        </div>

        <div>
          <div
            v-for="item in daughters"
            :key="item.id"
            class="flex flex-col gap-3"
          >
            <div
              class="flex items-center gap-6 laptop:w-3/4 mobile:w-full"
              :class="item.id !== daughters[0].id && 'mt-4'"
            >
              <TextField
                :fieldName="item.id === 1 ? 'Họ và tên con gái' : ''"
                placeholder="vd: Bùi Văn A"
                className="border-2"
                :value="item.name"
                @input="(value) => handleInputNameDaughter(value, item.id)"
              />
              <span
                @click="deleteDaughter(item)"
                class="cursor-pointer text-textPrimary material-symbols-outlined"
                :class="[
                  item.id === daughters[0].id && 'mt-8',
                  daughters.length <= 1 && 'text-gray-200 cursor-not-allowed',
                ]"
              >
                delete
              </span>
              <span
                @click="addDaughter"
                class="cursor-pointer text-textPrimary material-symbols-outlined"
                :class="[
                  item.id === daughters[0].id && 'mt-8',
                  daughters.length >= 5 && 'text-gray-200 cursor-not-allowed',
                ]"
              >
                add_circle
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end w-full mt-24">
      <div class="flex gap-6 laptop:w-1/4 mobile:w-full">
        <Button
          :type="TYPE_BUTTON.RED"
          text="Quay lại"
          @handleClick="handleBack"
        />
        <Button text="Lưu thay đổi" @handleClick="handleSave" />
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "~/components/common/TextField.vue";
import Button from "~/components/common/Button.vue";
import { v4 as uuidv4 } from "uuid";
import { TYPE_BUTTON } from "~/constants/";
import { mapActions } from "vuex";
export default {
  name: "SettingComponent",
  components: {
    TextField,
    Button,
  },
  data() {
    return {
      TYPE_BUTTON,
      // greatGrandfather: "",
      // greatGrandmother: "",
      // grandfather: "",
      // grandmother: "",
      husband: "",
      wife: "",
      sons: [{ id: 1, name: "" }],
      daughters: [{ id: 1, name: "" }],
    };
  },
  methods: {
    ...mapActions(["setNotify"]),
    addSon() {
      if (this.sons.length >= 5) return;
      this.sons.push({ id: uuidv4(), name: "" });
    },
    deleteSon(son) {
      if (this.sons.length <= 1) return;
      this.sons = this.sons.filter((item) => item.id !== son.id);
    },
    handleInputNameSon(value, id) {
      const arr = this.sons.map((item) => {
        if (item.id === id) {
          return { ...item, name: value };
        } else return item;
      });
      this.sons = [...arr];
    },

    addDaughter() {
      if (this.daughters.length >= 5) return;
      this.daughters.push({ id: uuidv4(), name: "" });
    },
    deleteDaughter(daughter) {
      if (this.daughters.length <= 1) return;
      this.daughters = this.daughters.filter((item) => item.id !== daughter.id);
    },
    handleInputNameDaughter(value, id) {
      const arr = this.daughters.map((item) => {
        if (item.id === id) {
          return { ...item, name: value };
        } else return item;
      });
      this.daughters = [...arr];
    },
    handleBack() {
      this.$router.push("/");
    },
    handleSave() {
      const nameSons = this.sons
        .filter((item) => item.name.trim() !== "")
        .map((item) => item.name.trim());
      const nameDaughters = this.daughters
        .filter((item) => item.name.trim() !== "")
        .map((item) => item.name.trim());
      const data = {
        // greatGrandfather: this.greatGrandfather,
        // greatGrandmother: this.greatGrandmother,
        // grandfather: this.grandfather,
        // grandmother: this.grandmother,
        husband: this.husband || "họ và tên chồng",
        wife: this.wife || "họ và tên vợ",
        sons: nameSons,
        daughters: nameDaughters,
        children: [...nameSons, ...nameDaughters],
      };
      !data.sons.length && (data.sons = "họ và tên con trai");
      !data.daughters.length && (data.daughters = "họ và tên con gái");
      !data.children.length && (data.children = "họ và tên các con");
      localStorage.setItem("nameMember", JSON.stringify(data));
      this.setNotify({
        isOpen: true,
        text: "Thay đổi tên thành công",
        type: "success",
      });
      this.$router.push("/");
    },
  },
};
</script>

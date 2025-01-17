<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <ContentBox title="Preset">
        <ButtonList ref="buttonList" title="Group">
          <PushButton v-for="(value, id) in effectPresets" :key="id" :padding="'0'" :button-id="value"
                      :is-active="isActive(value)" @click="buttonPressed(value)">
            <template #left>
              <div style="padding: 8px; overflow: hidden; text-overflow: ellipsis">
                {{ getLabel(id, value) }}
              </div>
            </template>
            <template #right>
              <div style="padding: 8px" @click.prevent.stop="menuPressed($event, value)">
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
              </div>
            </template>
          </PushButton>
        </ButtonList>
      </ContentBox>
      <DropMenu
          :options="menu_options"
          ref="contextMenu"
          @option-clicked="optionClicked"
      >
      </DropMenu>

      <ModalBox v-if="showRenameModal" @close="showRenameModal = false">
        <template v-slot:title>Enter New Preset Name</template>
        <template v-slot:default>
          <ModalInput ref="newName" v-model="newPresetName" placeholder="New Preset Name"
                      @on-enter="showRenameModal = false; renamePreset()"/>
        </template>
        <template v-slot:footer>
          <ModalButton @click="showRenameModal = false; renamePreset()">Ok</ModalButton>
          <ModalButton @click="showRenameModal = false; newPresetName = ''">Cancel</ModalButton>
        </template>
      </ModalBox>

    </div>
    <MainTabContent :no-left-pad="true">
      <ReverbEffect/>
      <EchoEffect/>
      <PitchEffect/>
      <GenderEffect/>
      <MegaphoneEffect/>
      <RobotEffect/>
      <HardTuneEffect/>
    </MainTabContent>
  </div>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
import EchoEffect from "@/components/sections/effects/EchoEffect";
import PitchEffect from "@/components/sections/effects/PitchEffect";
import GenderEffect from "@/components/sections/effects/GenderEffect";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect";
import RobotEffect from "@/components/sections/effects/RobotEffect";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect";
import ContentBox from "@/components/ContentBox";
import PushButton from "@/components/button_list/Button";
import ButtonList from "@/components/button_list/ButtonList";
import {EffectPresets} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";
import {store} from "@/store";
import DropMenu from "@/components/design/DropMenu";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ModalBox from "@/components/design/modal/ModalBox";
import ModalButton from "@/components/design/modal/ModalButton";
import ModalInput from "@/components/design/modal/ModalInput";

export default {
  name: "EffectsTab",
  components: {
    ModalInput,
    ModalButton,
    ModalBox,
    DropMenu,
    ButtonList,
    PushButton,
    ContentBox,
    HardTuneEffect,
    RobotEffect, MegaphoneEffect, GenderEffect, PitchEffect, EchoEffect, ReverbEffect, MainTabContent
  },

  data() {
    return {
      effectPresets: EffectPresets,
      showRenameModal: false,
      newPresetName: '',

      // This will need to be generated per-button..
      menu_options: [{name: 'Rename', slug: 'rename'}, {name: 'Save to Library', slug: 'save'}],
    };
  },

  methods: {
    getLabel(id, key) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "";
      }
      return (id + 1).toString() + ": " + store.getActiveDevice().effects.preset_names[key];
    },

    isActive(key) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return store.getActiveDevice().effects.active_preset === key;
    },

    buttonPressed(id) {
      if (!this.isActive(id)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": id});
      }
    },

    menuPressed(event, item) {
      // If this wasn't on the active profile, load the selected one..
      if (!this.isActive(item)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": item});
      }
      this.$refs.contextMenu.showMenu(event, item, this.$refs.buttonList.getScrollTop());
    },

    renamePreset() {
      let command = {"RenameActivePreset": this.newPresetName}

      sendHttpCommand(store.getActiveSerial(), command)
          .catch((error) => {
            console.log(error);
          });
    },

    saveActivePreset() {
      sendHttpCommand(store.getActiveSerial(),{ "SaveActivePreset": [] })
          .catch((error) => {
            console.log(error);
          });
    },

    optionClicked(event) {
      if (event.option.slug === "rename") {
        this.showRenameModal = true;
        this.$nextTick(() => {
          this.$refs.newName.focusInput();
        })
      }

      if (event.option.slug === "save") {
        this.saveActivePreset();
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>

  <div id="main">
    <DeviceSelector v-show="!isDeviceSet()"/>

    <FileTabs :device-set="isDeviceSet()"/>

    <div v-show="isDeviceSet()" style="height: 25px; background-color: #3b413f"/>

    <Tabs v-show="isDeviceSet()">
      <Tab name="Mic">
          <Mic/>
      </Tab>
      <Tab name="Mixer" selected>
        <MainTabContent>
          <Faders/>
          <Mixer/>
        </MainTabContent>
      </Tab>
      <Tab name="Effects" :hidden="isDeviceMini()" :left_align="false" >
        <EffectsTab />
      </Tab>
      <Tab name="Sampler" :hidden="isDeviceMini()" :left_align="true" >
        <MainTabContent>
          <SamplerTab />
        </MainTabContent>
      </Tab>
      <Tab name="Cough" :left_align="false">
        <MainTabContent>
          <Cough/>
        </MainTabContent>
      </Tab>
      <Tab name="Lighting" :left_align="false">
          <LightingTab />
      </Tab>
      <Tab name="Routing" :left_align="false">
        <MainTabContent>
          <Routing/>
        </MainTabContent>
      </Tab>
      <Tab name="System" :left_align="false">
        <MainTabContent>
          <SystemComponent/>
        </MainTabContent>
      </Tab>
    </Tabs>
  </div>

</template>

<script>

import Faders from "./sections/Faders"
import Mixer from "./sections/Mixer";
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import Routing from "@/components/sections/Routing";
import Mic from "@/components/sections/Mic";
import DeviceSelector from "@/components/sections/DeviceSelector";
import {store} from "@/store";
import Cough from "@/components/sections/Cough";
import {websocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System";
import FileTabs from "@/components/sections/files/FileTabs";
import MainTabContent from "@/components/design/MainTabContent";
import EffectsTab from "@/components/sections/EffectsTab";
import {isDeviceMini} from "@/util/util";
import LightingTab from "@/components/sections/LightingTab";
import SamplerTab from "@/components/sections/SamplerTab";

export default {
  name: 'GoXLR',
  components: {
    SamplerTab,
    LightingTab,
    EffectsTab,
    MainTabContent,
    FileTabs,
    SystemComponent,
    Cough,
    DeviceSelector,
    Routing,
    Tab,
    Tabs,
    Mixer,
    Faders,
    Mic
  },

  data() {
    return {
      timer: ''
    }
  },

  methods: {
    isDeviceMini() {
      return isDeviceMini();
    },

    isDeviceSet() {
      return (store.hasActiveDevice() && store.isConnected());
    },
  },

  created() {
    websocket.get_status().then((data) => {
      store.replaceData(data);
    });
  },
}
</script>

<style scoped>
#main {
  width: 100%;
  font-size: 10pt;
}
</style>

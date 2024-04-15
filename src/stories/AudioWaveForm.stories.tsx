import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
// import { fn } from "@storybook/test";
import { AudioWaveForm } from "../components";

const meta: Meta = {
  title: "WaveForm/AudioWaveForm",
  component: AudioWaveForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    audioFileSrc: {
      control: "text",
      description: "오디오 파일에 대한 src 경로",
    },
    waveFormClassName: {
      control: "text",
      description: "waveform에 대한 클래스 명",
    },
    waveFormWidth: {
      control: "number",
      description: "waveform 캔버스에 대한 넓이",
    },
    waveFromHeight: {
      control: "number",
      description: "waveform 캔버스에 대한 높이",
    },
    barWidth: {
      control: "number",
      description: "waveform 캔버스 내부 단일 막대에 대한 넓이",
    },
    barGap: {
      control: "number",
      description: "waveform 캔버스 내부 막대 사이의 간격",
    },
    baseBarHeight: {
      control: "number",
      description: "waveform 캔버스 내부 기본 막대 높이",
    },
    barVariability: {
      control: "number",
      description: "waveform 캔버스 내부 bar 끼리의 높낮이 가변성",
    },
    backgroundTopColor: {
      control: "text",
      description: "waveform 캔버스 윗 부분에 대한 배경 색상",
    },
    backgroundBottomColor: {
      control: "text",
      description: "waveform 캔버스 아랫 부분에 대한 배경 색상",
    },
    barTopColor: {
      control: "text",
      description: "waveform 캔버스 윗부분에 대한 bar 색상",
    },
    barBottomColor: {
      control: "text",
      description: "waveform 캔버스 아랫 부분에 대한 bar 색상",
    },
  },
} satisfies Meta<typeof AudioWaveForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WaveForm: Story = {
  args: {
    audioFileSrc: "/music2.mp3",
    waveFormClassName: "",
    waveFormWidth: 500,
    waveFromHeight: 200,
    barWidth: 3,
    barGap: 3,
    baseBarHeight: 0.2,
    barVariability: 0.6,
    backgroundTopColor: "rgb(92, 92, 92)",
    backgroundBottomColor: "rgba(0, 128, 255, 0.7)",
    barTopColor: "rgb(0, 128, 255)",
    barBottomColor: "rgba(92, 92, 92, 0.7)",
  },
};

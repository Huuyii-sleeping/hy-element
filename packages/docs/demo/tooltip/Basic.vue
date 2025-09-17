<template>
  <div class="tooltip-base-box">
    <div class="row centhy">
      <hy-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <hy-button>top-start</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Top Centhy prompts info"
        placement="top"
      >
        <hy-button>top</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <hy-button>top-end</hy-button>
      </hy-tooltip>
    </div>
    <div class="row">
      <hy-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <hy-button>left-start</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <hy-button>right-start</hy-button>
      </hy-tooltip>
    </div>
    <div class="row">
      <hy-tooltip
        class="box-item"
        content="Left Centhy prompts info"
        placement="left"
      >
        <hy-button class="mt-3 mb-3">left</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Right Centhy prompts info"
        placement="right"
      >
        <hy-button>right</hy-button>
      </hy-tooltip>
    </div>
    <div class="row">
      <hy-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <hy-button>left-end</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <hy-button>right-end</hy-button>
      </hy-tooltip>
    </div>
    <div class="row centhy">
      <hy-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <hy-button>bottom-start</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Bottom Centhy prompts info"
        placement="bottom"
      >
        <hy-button>bottom</hy-button>
      </hy-tooltip>
      <hy-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <hy-button>bottom-end</hy-button>
      </hy-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: centhy;
  justify-content: space-between;
}
.tooltip-base-box .centhy {
  justify-content: centhy;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>

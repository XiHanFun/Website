<script setup lang="ts">
import {
  XhAccordionRoot,
  XhAlertDescription,
  XhAlertRoot,
  XhAlertTitle,
  XhAvatarFallback,
  XhAvatarRoot,
  XhBadge,
  XhButton,
  XhCheckbox,
  XhCountdown,
  XhDialogCloseTrigger,
  XhDialogContent,
  XhDialogDescription,
  XhDialogRoot,
  XhDialogTitle,
  XhDialogTrigger,
  XhDrawerCloseTrigger,
  XhDrawerContent,
  XhDrawerRoot,
  XhDrawerTitle,
  XhDrawerTrigger,
  XhEmptyStateAction,
  XhEmptyStateDescription,
  XhEmptyStateIcon,
  XhEmptyStateRoot,
  XhEmptyStateTitle,
  XhPaginationEllipsis,
  XhPaginationItem,
  XhPaginationNextTrigger,
  XhPaginationPrevTrigger,
  XhPaginationRoot,
  XhPinInputInput,
  XhPinInputLabel,
  XhPinInputRoot,
  XhPopoverContent,
  XhPopoverDescription,
  XhPopoverPositioner,
  XhPopoverRoot,
  XhPopoverTitle,
  XhPopoverTrigger,
  XhProgress,
  XhRadioGroupRoot,
  XhRatingControl,
  XhRatingItem,
  XhRatingLabel,
  XhRatingRoot,
  XhSkeletonBone,
  XhSkeletonRoot,
  XhSpinner,
  XhStepsIndicator,
  XhStepsItem,
  XhStepsList,
  XhStepsRoot,
  XhStepsSeparator,
  XhStepsTitle,
  XhStepsTrigger,
  XhSwitch,
  XhTableBody,
  XhTableCell,
  XhTableColumnHeader,
  XhTableHeader,
  XhTableRoot,
  XhTableRow,
  XhTagsInputControl,
  XhTagsInputInput,
  XhTagsInputItem,
  XhTagsInputItemDeleteTrigger,
  XhTagsInputItemPreview,
  XhTagsInputItemText,
  XhTagsInputLabel,
  XhTagsInputRoot,
  XhToastCloseTrigger,
  XhToastDescription,
  XhToasterGroup,
  XhToasterRoot,
  XhToastRoot,
  XhToastTitle,
  XhTooltipContent,
  XhTooltipPositioner,
  XhTooltipRoot,
  XhTooltipTrigger,
  XhTreeBranch,
  XhTreeBranchContent,
  XhTreeBranchControl,
  XhTreeBranchText,
  XhTreeBranchTrigger,
  XhTreeItem,
  XhTreeItemText,
  XhTreeRoot,
  XhTreeTree,
} from '@xihan-ui/vue'
import { computed, ref } from 'vue'

const tones = ['brand', 'neutral', 'success', 'warning', 'danger', 'info'] as const
const variants = ['solid', 'subtle', 'outline', 'ghost'] as const

const plans = [
  { value: 'free', label: '免费' },
  { value: 'team', label: '团队' },
  { value: 'enterprise', label: '企业' },
]

const tags = ref(['多租户', '字段级安全'])
const notify = ref(true)
const agree = ref<boolean | 'indeterminate'>('indeterminate')
const loading = ref(true)

const faq = [
  { value: 'install', label: '怎么安装', content: '装 @xihan-ui/vue 与 @xihan-ui/styles 两个包，皮肤单独引一次。' },
  { value: 'skin', label: '怎么换皮肤', content: '皮肤只认 data-part 与 data-state，覆写同名令牌即可，不必改组件。' },
  { value: 'a11y', label: '键盘怎么走', content: '方向键只在标题之间搬焦点，永不进内容区，首尾不回绕。' },
]

const steps = [
  { title: '导入表' },
  { title: '推断配置' },
  { title: '生成代码' },
  { title: '接线菜单' },
]

const columns = [
  { id: 'name', label: '模块', width: '9rem' },
  { id: 'layer', label: '层' },
  { id: 'state', label: '状态', width: '5rem' },
]

const moduleRows = [
  { id: 'data', name: 'Data', layer: '基础设施', state: '稳定' },
  { id: 'eventbus', name: 'EventBus', layer: '基础设施', state: '稳定' },
  { id: 'workflow', name: 'Workflow', layer: '基础设施', state: '稳定' },
  { id: 'mcp', name: 'Web.Mcp', layer: '展示', state: '新增' },
]

const tableRows = computed(() => moduleRows.map(r => ({ id: r.id })))

const tree = [
  {
    value: 'packages',
    label: 'packages',
    children: [
      { value: 'adapters', label: 'adapters', children: [{ value: 'vue', label: 'vue' }, { value: 'wc', label: 'web-components' }] },
      { value: 'engine', label: 'engine', children: [{ value: 'kernel', label: 'kernel' }, { value: 'machine', label: 'machine' }] },
    ],
  },
]

const toastTranslations = { close: '关闭' }
const halfHour = 30 * 60 * 1000
</script>

<template>
  <div class="stack stack--lg">
    <XhAlertRoot tone="info" :closable="false">
      <XhAlertTitle>下面都是活的</XhAlertTitle>
      <XhAlertDescription>
        每一块都是真实组件，不是截图。回到主题台改任意一个轴，这里会整片跟着变。
      </XhAlertDescription>
    </XhAlertRoot>

    <!-- 按钮矩阵 -->
    <div class="panel demo-card">
      <div class="demo-card__name">
        <span class="demo-card__title">按钮 · 四形态 × 六语气</span>
        <span class="demo-card__tag">button</span>
      </div>
      <div class="stack" style="gap: var(--xh-space-2)">
        <div v-for="v in variants" :key="v" class="row" style="gap: var(--xh-space-2)">
          <XhButton v-for="t in tones" :key="t" :variant="v" :tone="t" size="sm">{{ t }}</XhButton>
        </div>
      </div>
    </div>

    <div class="grid" style="--cols: 1; --cols-lg: 2">
      <!-- 表单 -->
      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">表单控件</span>
          <span class="demo-card__tag">radio-group · tags-input · rating · pin-input</span>
        </div>

        <XhRadioGroupRoot :collection="plans" default-value="team" label="套餐" />

        <XhTagsInputRoot v-slot="{ value }" v-model:value="tags" placeholder="回车落一个">
          <XhTagsInputLabel>关注的能力</XhTagsInputLabel>
          <XhTagsInputControl>
            <XhTagsInputItem v-for="t in value" :key="t" :value="t">
              <XhTagsInputItemPreview>
                <XhTagsInputItemText>{{ t }}</XhTagsInputItemText>
                <XhTagsInputItemDeleteTrigger>×</XhTagsInputItemDeleteTrigger>
              </XhTagsInputItemPreview>
            </XhTagsInputItem>
            <XhTagsInputInput />
          </XhTagsInputControl>
        </XhTagsInputRoot>

        <XhRatingRoot v-slot="{ items, value }" :default-value="4" allow-half>
          <XhRatingLabel>整体满意度：{{ value }}</XhRatingLabel>
          <XhRatingControl>
            <XhRatingItem v-for="i in items" :key="i" :value="i">★</XhRatingItem>
          </XhRatingControl>
        </XhRatingRoot>

        <XhPinInputRoot :length="4" placeholder="·">
          <XhPinInputLabel>验证码</XhPinInputLabel>
          <div style="display: flex">
            <XhPinInputInput v-for="i in 4" :key="i" :index="i - 1" />
          </div>
        </XhPinInputRoot>

        <div class="row" style="gap: var(--xh-space-4)">
          <label class="row" style="gap: var(--xh-space-2)">
            <XhSwitch v-model:checked="notify" size="sm" />
            <span class="text-sm">推送通知</span>
          </label>
          <label class="row" style="gap: var(--xh-space-2)">
            <XhCheckbox v-model:checked="agree" size="sm" />
            <span class="text-sm">三态复选（{{ agree }}）</span>
          </label>
        </div>
      </div>

      <!-- 浮层 -->
      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">浮层与反馈</span>
          <span class="demo-card__tag">dialog · drawer · popover · tooltip · toast</span>
        </div>

        <div class="row">
          <XhDialogRoot v-slot="{ setOpen }" :translations="{ close: '关闭' }">
            <XhDialogTrigger>对话框</XhDialogTrigger>
            <XhDialogContent>
              <XhDialogTitle>确认发布</XhDialogTitle>
              <XhDialogDescription>
                焦点被陷在面板里，Esc 或点遮罩关闭，关闭后焦点回到触发按钮，外部内容对读屏隐藏。
              </XhDialogDescription>
              <div class="row" style="justify-content: flex-end; margin-block-start: var(--xh-space-4)">
                <XhButton variant="ghost" @click="setOpen(false)">取消</XhButton>
                <XhButton variant="solid" @click="setOpen(false)">发布</XhButton>
              </div>
              <XhDialogCloseTrigger>✕</XhDialogCloseTrigger>
            </XhDialogContent>
          </XhDialogRoot>

          <XhDrawerRoot side="right" :translations="{ close: '关闭' }">
            <XhDrawerTrigger>抽屉</XhDrawerTrigger>
            <XhDrawerContent>
              <XhDrawerTitle>筛选条件</XhDrawerTitle>
              <p class="text-sm muted" style="margin-block-start: var(--xh-space-3)">
                面板贴住右边，展开期间页面滚不动。
              </p>
              <XhDrawerCloseTrigger>✕</XhDrawerCloseTrigger>
            </XhDrawerContent>
          </XhDrawerRoot>

          <XhPopoverRoot placement="bottom-start" :translations="{ close: '关闭' }">
            <XhPopoverTrigger>气泡卡片</XhPopoverTrigger>
            <XhPopoverPositioner>
              <XhPopoverContent>
                <XhPopoverTitle>非模态</XhPopoverTitle>
                <XhPopoverDescription>焦点不被陷住，点外部即收起。</XhPopoverDescription>
              </XhPopoverContent>
            </XhPopoverPositioner>
          </XhPopoverRoot>

          <XhTooltipRoot :open-delay="200">
            <XhTooltipTrigger>提示</XhTooltipTrigger>
            <XhTooltipPositioner>
              <XhTooltipContent>悬停或聚焦都会出</XhTooltipContent>
            </XhTooltipPositioner>
          </XhTooltipRoot>
        </div>

        <XhToasterRoot v-slot="{ create, dismiss, count }">
          <div class="row">
            <XhButton
              variant="outline"
              size="sm"
              @click="create({ type: 'success', title: '已保存', description: '内容已同步到云端' })"
            >
              弹一条 success
            </XhButton>
            <XhButton
              variant="outline"
              size="sm"
              @click="create({ type: 'error', title: '同步失败', description: '网络中断，稍后自动重试' })"
            >
              弹一条 error
            </XhButton>
            <span class="mono subtle text-xs">队列 {{ count }} 条</span>
          </div>

          <XhToasterGroup>
            <template #default="{ toast }">
              <XhToastRoot
                :id="toast.id"
                :title="toast.title"
                :description="toast.description"
                :type="toast.type"
                :duration="toast.duration"
                :remove-delay="toast.removeDelay"
                :closable="toast.closable"
                :translations="toastTranslations"
                @status-change="(details) => details.status === 'unmounted' && dismiss(details.id)"
              >
                <XhToastTitle />
                <XhToastDescription />
                <XhToastCloseTrigger>✕</XhToastCloseTrigger>
              </XhToastRoot>
            </template>
          </XhToasterGroup>
        </XhToasterRoot>
      </div>

      <!-- 表格与分页 -->
      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">表格与分页</span>
          <span class="demo-card__tag">table · pagination</span>
        </div>

        <div style="overflow-x: auto">
          <XhTableRoot :columns="columns" :rows="tableRows" size="sm">
            <XhTableHeader>
              <XhTableRow>
                <XhTableColumnHeader v-for="col in columns" :key="col.id" :value="col.id">
                  {{ col.label }}
                </XhTableColumnHeader>
              </XhTableRow>
            </XhTableHeader>
            <XhTableBody>
              <XhTableRow v-for="r in moduleRows" :key="r.id" :value="r.id">
                <XhTableCell value="name">
                  <span class="mono text-xs">{{ r.name }}</span>
                </XhTableCell>
                <XhTableCell value="layer">{{ r.layer }}</XhTableCell>
                <XhTableCell value="state">
                  <XhBadge :tone="r.state === '新增' ? 'brand' : 'success'" variant="subtle" size="sm">
                    {{ r.state }}
                  </XhBadge>
                </XhTableCell>
              </XhTableRow>
            </XhTableBody>
          </XhTableRoot>
        </div>

        <XhPaginationRoot v-slot="{ pages, page, totalPages }" :count="96" :page-size="10" :default-page="2">
          <XhPaginationPrevTrigger>‹</XhPaginationPrevTrigger>
          <template v-for="(p, i) in pages" :key="`${p}-${i}`">
            <XhPaginationEllipsis v-if="p === 'ellipsis'">…</XhPaginationEllipsis>
            <XhPaginationItem v-else :value="p">{{ p }}</XhPaginationItem>
          </template>
          <XhPaginationNextTrigger>›</XhPaginationNextTrigger>
          <span class="mono subtle text-xs" style="flex-basis: 100%">第 {{ page }} / {{ totalPages }} 页</span>
        </XhPaginationRoot>
      </div>

      <!-- 结构与状态 -->
      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">结构与状态</span>
          <span class="demo-card__tag">accordion · tree · steps · progress · skeleton</span>
        </div>

        <XhAccordionRoot :collection="faq" :default-value="['install']" />

        <XhTreeRoot :collection="tree" :default-expanded-value="['packages']">
          <XhTreeTree>
            <XhTreeBranch value="packages">
              <XhTreeBranchControl>
                <XhTreeBranchTrigger>▸</XhTreeBranchTrigger>
                <XhTreeBranchText>packages</XhTreeBranchText>
              </XhTreeBranchControl>
              <XhTreeBranchContent>
                <XhTreeBranch value="adapters">
                  <XhTreeBranchControl>
                    <XhTreeBranchTrigger>▸</XhTreeBranchTrigger>
                    <XhTreeBranchText>adapters</XhTreeBranchText>
                  </XhTreeBranchControl>
                  <XhTreeBranchContent>
                    <XhTreeItem value="vue">
                      <XhTreeItemText>vue</XhTreeItemText>
                    </XhTreeItem>
                    <XhTreeItem value="wc">
                      <XhTreeItemText>web-components</XhTreeItemText>
                    </XhTreeItem>
                  </XhTreeBranchContent>
                </XhTreeBranch>
                <XhTreeBranch value="engine">
                  <XhTreeBranchControl>
                    <XhTreeBranchTrigger>▸</XhTreeBranchTrigger>
                    <XhTreeBranchText>engine</XhTreeBranchText>
                  </XhTreeBranchControl>
                  <XhTreeBranchContent>
                    <XhTreeItem value="kernel">
                      <XhTreeItemText>kernel</XhTreeItemText>
                    </XhTreeItem>
                    <XhTreeItem value="machine">
                      <XhTreeItemText>machine</XhTreeItemText>
                    </XhTreeItem>
                  </XhTreeBranchContent>
                </XhTreeBranch>
              </XhTreeBranchContent>
            </XhTreeBranch>
          </XhTreeTree>
        </XhTreeRoot>

        <XhStepsRoot v-slot="{ step }" :count="steps.length" :default-step="2" size="sm">
          <XhStepsList>
            <XhStepsItem v-for="(s, i) in steps" :key="s.title" :value="i">
              <XhStepsTrigger>
                <XhStepsIndicator>{{ step > i ? '✓' : i + 1 }}</XhStepsIndicator>
                <XhStepsTitle>{{ s.title }}</XhStepsTitle>
              </XhStepsTrigger>
              <XhStepsSeparator />
            </XhStepsItem>
          </XhStepsList>
        </XhStepsRoot>

        <div class="row" style="gap: var(--xh-space-5)">
          <XhProgress :value="68" variant="circle" />
          <XhProgress :value="42" variant="dashboard" tone="warning" />
          <XhSpinner label="载入中" />
          <span class="mono subtle text-xs">距离维护窗口 <XhCountdown :value="halfHour" /></span>
        </div>

        <XhButton variant="ghost" size="sm" @click="loading = !loading">
          {{ loading ? '停止骨架' : '显示骨架' }}
        </XhButton>
        <XhSkeletonRoot :loading="loading">
          <XhSkeletonBone />
          <XhSkeletonBone />
        </XhSkeletonRoot>
      </div>
    </div>

    <!-- 空态与头像 -->
    <div class="grid" style="--cols: 1; --cols-lg: 2">
      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">空态</span>
          <span class="demo-card__tag">empty-state</span>
        </div>
        <XhEmptyStateRoot>
          <XhEmptyStateIcon>∅</XhEmptyStateIcon>
          <XhEmptyStateTitle>还没有数据</XhEmptyStateTitle>
          <XhEmptyStateDescription>导入一张表就能生成整套增删改查。</XhEmptyStateDescription>
          <XhEmptyStateAction>
            <XhButton variant="solid" size="sm">导入表</XhButton>
          </XhEmptyStateAction>
        </XhEmptyStateRoot>
      </div>

      <div class="panel demo-card">
        <div class="demo-card__name">
          <span class="demo-card__title">头像与标记</span>
          <span class="demo-card__tag">avatar · badge</span>
        </div>
        <div class="row">
          <XhAvatarRoot v-for="n in ['曦', '寒', 'UI', 'FW']" :key="n">
            <XhAvatarFallback>{{ n }}</XhAvatarFallback>
          </XhAvatarRoot>
        </div>
        <div class="row">
          <XhBadge v-for="t in tones" :key="t" :tone="t" variant="subtle" size="sm">{{ t }}</XhBadge>
        </div>
      </div>
    </div>
  </div>
</template>

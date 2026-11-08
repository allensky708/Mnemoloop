<script lang="ts">
	import { t, tn } from '@/i18n';
	import { ProgressBar } from '@/ui/components/elements';
	import type Props from './types';

	let { state }: Props = $props();
</script>

{#if state.status === 'ready'}
	<div class="ml-priming__progress">
		<span class="ml-priming__progress-count">
			{$t('{current} of {total} notes', { current: state.currentIndex + 1, total: state.notes.length })}
		</span>
		<ProgressBar
			max={state.notes.length}
			value={state.currentIndex + 1}
			showPercentage
			ariaLabel={$t('Priming progress')}
		/>
	</div>
{/if}

<style lang="scss">
	@use 'tokens' as *;

	.ml-priming__progress {
		display: flex;
		flex-direction: column;
		gap: $spacing-xs;
	}

	.ml-priming__progress-count {
		color: $text-normal;
		font-size: $font-sm;
		font-weight: $font-semibold;
	}
</style>

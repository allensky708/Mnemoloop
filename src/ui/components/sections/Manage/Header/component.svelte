<script lang="ts">
	import { t, tn } from '@/i18n';
	import { Button, Icon } from '@/ui/components/elements';
	import type ManageHeaderProps from './types';

	let { totalCount, visibleCount, onAdd, className }: ManageHeaderProps = $props();

	const summary = $derived(
		totalCount === 0
			? ''
			: visibleCount === totalCount
				? $tn(totalCount, '{count} card', '{count} cards', { count: totalCount })
				: $t('{shown} of {total} cards', { shown: visibleCount, total: totalCount }),
	);
</script>

<header class="ml-manage__header {className ?? ''}">
	<div class="ml-manage__header-group">
		<h2 class="ml-manage__title">{$t('Manage flashcards')}</h2>
		{#if summary}
			<p class="ml-manage__subtitle" aria-live="polite">{summary}</p>
		{/if}
	</div>
	<Button variant="primary" size="small" onclick={onAdd}>
		{#snippet icon()}
			<Icon name="plus" size={14} />
		{/snippet}
		{$t('Add')}
	</Button>
</header>

<style lang="scss">
	@use 'tokens' as *;

	.ml-manage__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-sm;
	}

	.ml-manage__header-group {
		min-width: 0;
	}

	.ml-manage__title {
		margin: 0;
		font-size: $font-lg;
		font-weight: $font-semibold;
		color: $text-normal;
	}

	.ml-manage__subtitle {
		margin: $spacing-xxs 0 0 0;
		font-size: $font-sm;
		color: $text-muted;
	}
</style>

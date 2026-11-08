<script lang="ts">
	import { t, tn } from '@/i18n';
	import { Button, Table } from '@/ui/components/elements';
	import ManageLoadingState from '../LoadingState/component.svelte';
	import ManageTable from '../Table/component.svelte';
	import ManageDeleteConfirmation from '../DeleteConfirmation/component.svelte';
	import type { FlashcardMetadata } from '@/schemas';
	import type ManageResultsProps from './types';

	let {
		isLoading,
		totalCount,
		visibleCount,
		cards,
		previews,
		deckOptions,
		onAddDeck,
		onRemoveDeck,
		onStatusChange,
		onEdit,
		onDelete,
		onAdd,
		onReset,
		className,
	}: ManageResultsProps = $props();

	let pendingDelete = $state<FlashcardMetadata | null>(null);

	function requestDelete(card: FlashcardMetadata): void {
		pendingDelete = card;
	}

	function confirmDelete(): void {
		if (pendingDelete) onDelete(pendingDelete);
		pendingDelete = null;
	}
</script>

<div class="ml-manage-results {className ?? ''}">
	{#if isLoading}
		<ManageLoadingState />
	{:else if totalCount === 0}
		<Table.EmptyState
			title={$t('No flashcards yet')}
			message={$t("Click 'Add' to create your first flashcard.")}
		>
			{#snippet action()}
				<Button variant="primary" size="small" onclick={onAdd}>{$t('Add flashcard')}</Button>
			{/snippet}
		</Table.EmptyState>
	{:else if visibleCount === 0}
		<Table.EmptyState
			title={$t('No cards match the current filters')}
			message={$t('Try adjusting or resetting your filters.')}
		>
			{#snippet action()}
				<Button variant="secondary" size="small" onclick={onReset}>{$t('Reset filters')}</Button>
			{/snippet}
		</Table.EmptyState>
	{:else}
		<ManageTable
			{cards}
			{previews}
			{deckOptions}
			{onAddDeck}
			{onRemoveDeck}
			{onStatusChange}
			{onEdit}
			onDelete={requestDelete}
		/>
	{/if}

	{#if pendingDelete}
		<ManageDeleteConfirmation
			cardLabel={previews[pendingDelete.file] ?? $t('this flashcard')}
			onCancel={() => (pendingDelete = null)}
			onConfirm={confirmDelete}
		/>
	{/if}
</div>

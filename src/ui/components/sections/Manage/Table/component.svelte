<script lang="ts">
	import type { FlashcardMetadata } from '@/schemas';
	import { Button, Icon, Select, Table } from '@/ui/components/elements';
	import { formatDate } from '@/utils/statistics-utils';
	import ManageDeckCell from './DeckCell/component.svelte';
	import TableRow from './Row/component.svelte';
	import { MANAGE_STATUS_OPTIONS } from '../options';
	import type ManageTableProps from './types';
	import { cardTypeKey, t } from '@/i18n';

	let {
		cards,
		previews,
		deckOptions,
		onAddDeck,
		onRemoveDeck,
		onStatusChange,
		onEdit,
		onDelete,
		className,
	}: ManageTableProps = $props();

	function labelFor(card: FlashcardMetadata): string {
		const preview = previews[card.file];
		return preview && !preview.includes('Loading') ? preview : $t('this card');
	}
</script>

<div class="ml-manage-table {className ?? ''}">
	<div class="ml-manage-table__wrap">
		<Table.Root caption={$t('Manage flashcards')} className="ml-manage-table__grid">
			<Table.Head>
				<Table.Row>
					<Table.Th scope="col">{$t('Type')}</Table.Th>
					<Table.Th scope="col">{$t('Content Preview')}</Table.Th>
					<Table.Th scope="col">{$t('Decks')}</Table.Th>
					<Table.Th scope="col">{$t('Status')}</Table.Th>
					<Table.Th scope="col">{$t('Due Date')}</Table.Th>
					<Table.Th scope="col">{$t('Actions')}</Table.Th>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{#each cards as card (card.uuid)}
					<TableRow
						{card}
						preview={previews[card.file]}
						{deckOptions}
						onAddDeck={(deck) => onAddDeck(card, deck)}
						onRemoveDeck={(deck) => onRemoveDeck(card, deck)}
						onStatusChange={(value) => onStatusChange(card, value)}
						onEdit={() => onEdit(card)}
						onDelete={() => onDelete(card)}
					/>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- Mobile stacked-card presentation -->
	<div class="ml-manage-table__mobile">
		{#each cards as card (card.uuid)}
			<article class="ml-manage-card" aria-label={$t('Flashcard: {label}', { label: labelFor(card) })}>
				<header class="ml-manage-card__header">
					<span class="ml-manage-card__badge ml-manage-card__badge--{card.card_type}">
						{$t(cardTypeKey(card.card_type))}
					</span>
					<div class="ml-manage-card__actions">
						<Button
							variant="icon"
							size="small"
							ariaLabel={$t('Edit {label}', { label: labelFor(card) })}
							onclick={() => onEdit(card)}
						>
							{#snippet icon()}
								<Icon name="pencil" size={14} />
							{/snippet}
						</Button>
						<Button
							variant="icon"
							size="small"
							ariaLabel={$t('Delete {label}', { label: labelFor(card) })}
							onclick={() => onDelete(card)}
						>
							{#snippet icon()}
								<Icon name="trash-2" size={14} />
							{/snippet}
						</Button>
					</div>
				</header>
				<dl class="ml-manage-card__fields">
					<div class="ml-manage-card__field">
						<dt class="ml-manage-card__label">{$t('Preview')}</dt>
						<dd class="ml-manage-card__value">{previews[card.file] ?? $t('Loading…')}</dd>
					</div>
					<div class="ml-manage-card__field">
						<dt class="ml-manage-card__label">{$t('Decks')}</dt>
						<dd class="ml-manage-card__value">
							<ManageDeckCell
								{card}
								{deckOptions}
								onAddDeck={(deck) => onAddDeck(card, deck)}
								onRemoveDeck={(deck) => onRemoveDeck(card, deck)}
							/>
						</dd>
					</div>
					<div class="ml-manage-card__field">
						<dt class="ml-manage-card__label">{$t('Status')}</dt>
						<dd class="ml-manage-card__value">
							<Select
								id={`ml-manage-status-m-${card.uuid}`}
								options={MANAGE_STATUS_OPTIONS.map((option) => ({ ...option, label: $t(option.label) }))}
								value={card.status}
								ariaLabel={$t('Status for {label}', { label: labelFor(card) })}
								onchange={(value) => onStatusChange(card, value)}
							/>
						</dd>
					</div>
					<div class="ml-manage-card__field">
						<dt class="ml-manage-card__label">{$t('Due Date')}</dt>
						<dd class="ml-manage-card__value">{formatDate(new Date(card.due))}</dd>
					</div>
				</dl>
			</article>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'tokens' as *;

	.ml-manage-table__wrap {
		overflow-x: auto;
		border: 1px solid $background-modifier-border;
		border-radius: $radius-md;
	}

	.ml-manage-table__wrap :global(.ml-table) {
		min-width: 640px;
	}

	/* Mobile stacked-card presentation (desktop table hidden at/under the mobile breakpoint) */
	.ml-manage-table__mobile {
		display: none;
	}

	.ml-manage-card {
		display: flex;
		flex-direction: column;
		gap: $spacing-xs;
		padding: $spacing-sm;
		border: 1px solid $background-modifier-border;
		border-radius: $radius-md;
		background-color: $background-primary;
	}

	.ml-manage-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-sm;
	}

	.ml-manage-card__actions {
		display: flex;
		gap: $spacing-xxs;
	}

	.ml-manage-card__fields {
		display: flex;
		flex-direction: column;
		gap: $spacing-xs;
		margin: 0;
	}

	.ml-manage-card__field {
		display: flex;
		flex-direction: column;
		gap: $spacing-xxs;
	}

	.ml-manage-card__label {
		margin: 0;
		font-size: $font-xs;
		font-weight: $font-semibold;
		text-transform: uppercase;
		color: $text-muted;
	}

	.ml-manage-card__value {
		margin: 0;
		font-size: $font-sm;
		color: $text-normal;
	}

	.ml-manage-card__badge {
		display: inline-block;
		padding: 2px $spacing-xs;
		border-radius: $radius-sm;
		font-size: $font-xs;
		text-transform: capitalize;
		background-color: $background-modifier-hover;
	}

	.ml-manage-card__badge--basic {
		color: $interactive-accent;
	}

	.ml-manage-card__badge--sequence {
		color: $text-muted;
	}

	.ml-manage-card__badge--quiz {
		color: $text-normal;
	}

	.ml-manage-card__badge--cloze {
		color: $text-normal;
	}

	@media (max-width: 480px) {
		.ml-manage-table__wrap {
			display: none;
		}

		.ml-manage-table__mobile {
			display: flex;
			flex-direction: column;
			gap: $spacing-sm;
		}
	}
</style>

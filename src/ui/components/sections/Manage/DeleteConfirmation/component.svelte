<script lang="ts">
	import { t, tn } from '@/i18n';
	import AlertDialog from '@/ui/components/elements/AlertDialog';
	import type ManageDeleteConfirmationProps from './types';

	let { cardLabel, onCancel, onConfirm }: ManageDeleteConfirmationProps = $props();
	let open = $state(true);

	function handleOpenChange(nextOpen: boolean): void {
		open = nextOpen;
		if (!nextOpen) onCancel();
	}
</script>

<AlertDialog.Root bind:open onOpenChange={handleOpenChange}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay />
		<AlertDialog.Content interactOutsideBehavior="close">
			<AlertDialog.Title level={3}>{$t('Delete flashcard?')}</AlertDialog.Title>
			<AlertDialog.Description>
				{$t('“{label}” will be permanently removed from your vault. This cannot be undone.', {
					label: cardLabel,
				})}
			</AlertDialog.Description>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>{$t('Cancel')}</AlertDialog.Cancel>
				<AlertDialog.Action onclick={onConfirm}>{$t('Delete flashcard')}</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>

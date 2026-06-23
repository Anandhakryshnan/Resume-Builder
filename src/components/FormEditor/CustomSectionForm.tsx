import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { CustomItem } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface CustomSectionFormProps {
  sectionId: string;
}

export const CustomSectionForm = ({ sectionId }: CustomSectionFormProps) => {
  const { state, dispatch } = useResume();
  const section = state.customSections?.find(s => s.id === sectionId);
  
  if (!section) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_CUSTOM_SECTION',
      payload: { id: section.id, name: e.target.value },
    });
  };

  const handleDeleteSection = () => {
    if (window.confirm(`Are you sure you want to delete the entire "${section.name}" section?`)) {
      dispatch({ type: 'DELETE_CUSTOM_SECTION', payload: section.id });
    }
  };

  const handleAddItem = () => {
    const newItem: CustomItem = {
      id: uuidv4(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    dispatch({ type: 'ADD_CUSTOM_ITEM', payload: { sectionId: section.id, item: newItem } });
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch({ type: 'DELETE_CUSTOM_ITEM', payload: { sectionId: section.id, itemId } });
  };

  const handleChangeItem = (itemId: string, field: keyof CustomItem, value: string) => {
    dispatch({
      type: 'UPDATE_CUSTOM_ITEM',
      payload: { sectionId: section.id, itemId, data: { [field]: value } },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(section.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_CUSTOM_ITEMS', payload: { sectionId: section.id, items } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Section Name</label>
          <input
            type="text"
            value={section.name}
            onChange={handleNameChange}
            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 font-bold"
            placeholder="e.g. Awards"
          />
        </div>
        <button
          onClick={handleDeleteSection}
          className="mt-6 p-2.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/30"
          title="Delete Section"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="h-px w-full bg-[var(--glass-border)] my-4"></div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`custom-list-${section.id}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {section.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-5 border border-[var(--glass-border)] rounded-2xl bg-white/5 relative group hover:bg-white/10 transition-colors ${snapshot.isDragging ? 'shadow-lg ring-2 ring-white' : ''}`}
                    >
                      <div 
                        {...provided.dragHandleProps} 
                        className="absolute left-2 top-4 text-[var(--app-text-muted)] hover:text-slate-200 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical size={18} />
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Item {index + 1}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleChangeItem(item.id, 'title', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Winner"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => handleChangeItem(item.id, 'subtitle', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Hackathon"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Date</label>
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => handleChangeItem(item.id, 'date', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="2023"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Description (Markdown Supported)</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => handleChangeItem(item.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300 resize-none"
                            placeholder="Describe your achievement..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleAddItem}
        className="w-full py-3.5 border-2 border-dashed border-white/20 rounded-xl text-[var(--app-text)] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <Plus size={18} /> Add Item
      </button>
    </div>
  );
};

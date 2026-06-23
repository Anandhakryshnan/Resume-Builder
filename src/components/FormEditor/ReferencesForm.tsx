import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { Reference } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const ReferencesForm = () => {
  const { state, dispatch } = useResume();
  const { references } = state;

  const handleAdd = () => {
    const newRef: Reference = {
      id: uuidv4(),
      name: '',
      position: '',
      company: '',
      contactInfo: '',
      relationship: '',
    };
    dispatch({ type: 'ADD_REFERENCE', payload: newRef });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_REFERENCE', payload: id });
  };

  const handleChange = (id: string, field: keyof Reference, value: string) => {
    dispatch({
      type: 'UPDATE_REFERENCE',
      payload: { id, data: { [field]: value } },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(references || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_REFERENCES', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="references-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {(references || []).map((ref, index) => (
                <Draggable key={ref.id} draggableId={ref.id} index={index}>
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
                        onClick={() => handleDelete(ref.id)}
                        className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                        title="Delete Reference"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Reference {index + 1}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Name</label>
                          <input
                            type="text"
                            value={ref.name}
                            onChange={(e) => handleChange(ref.id, 'name', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Jane Doe"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Company</label>
                          <input
                            type="text"
                            value={ref.company}
                            onChange={(e) => handleChange(ref.id, 'company', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Tech Innovators Inc."
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Position</label>
                          <input
                            type="text"
                            value={ref.position}
                            onChange={(e) => handleChange(ref.id, 'position', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Engineering Manager"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Relationship</label>
                          <input
                            type="text"
                            value={ref.relationship}
                            onChange={(e) => handleChange(ref.id, 'relationship', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Former Manager"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Contact Info</label>
                          <input
                            type="text"
                            value={ref.contactInfo}
                            onChange={(e) => handleChange(ref.id, 'contactInfo', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="jane.doe@example.com / +1 555-0123"
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
        onClick={handleAdd}
        className="w-full py-3.5 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-[var(--app-text)] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <Plus size={18} /> Add Reference
      </button>
    </div>
  );
};

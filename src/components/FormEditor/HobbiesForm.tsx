import { useResume } from '../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import type { Hobby } from '../../types/resume';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export const HobbiesForm = () => {
  const { state, dispatch } = useResume();
  const { hobbies } = state;

  const handleAdd = () => {
    const newHobby: Hobby = {
      id: uuidv4(),
      name: '',
      keywords: '',
    };
    dispatch({ type: 'ADD_HOBBY', payload: newHobby });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_HOBBY', payload: id });
  };

  const handleChange = (id: string, field: keyof Hobby, value: string) => {
    dispatch({
      type: 'UPDATE_HOBBY',
      payload: { id, data: { [field]: value } },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(hobbies || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch({ type: 'REORDER_HOBBIES', payload: items });
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="hobbies-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {(hobbies || []).map((hobby, index) => (
                <Draggable key={hobby.id} draggableId={hobby.id} index={index}>
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
                        onClick={() => handleDelete(hobby.id)}
                        className="absolute top-4 right-4 text-[var(--app-text-muted)] hover:text-rose-400 transition-colors"
                        title="Delete Hobby"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <h3 className="text-sm font-semibold text-slate-200 mb-4 pl-6 pr-8">Hobby/Interest {index + 1}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Name</label>
                          <input
                            type="text"
                            value={hobby.name}
                            onChange={(e) => handleChange(hobby.id, 'name', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Photography"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-medium text-[var(--app-text)] mb-1">Keywords</label>
                          <input
                            type="text"
                            value={hobby.keywords}
                            onChange={(e) => handleChange(hobby.id, 'keywords', e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--input-bg)] border-[var(--input-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-border)] focus:border-[var(--input-focus-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] transition-all duration-300"
                            placeholder="Landscapes, Portraits, Editing"
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
        <Plus size={18} /> Add Hobby/Interest
      </button>
    </div>
  );
};

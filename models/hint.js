import { Schema, model, models } from 'mongoose';

const HintSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hint: {
    type: String,
    required: [true, 'Tip is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Hint = models.Hint || model('Hint', HintSchema);

export default Hint;

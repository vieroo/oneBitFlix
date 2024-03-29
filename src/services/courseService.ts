import { Course } from "../models"

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: [
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']
      ],
      include: {
        association: 'Episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['thumbnail_url', 'thumbnailUrl'],
          ['seconds_long', 'secondsLong']
        ],
        order: [['order', 'ASC']],
        separate: true
      }
    })

    return courseWithEpisodes
  }
}
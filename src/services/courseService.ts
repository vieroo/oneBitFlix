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
        association: 'episodes',
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
  },

  getRandomFeaturedCourses: async () => {
    const feturedCourses = await Course.findAll({
      attributes: [
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']
      ],
      where: {
        featured: true
      }
    })

    const randoomFeaturedCourses = feturedCourses.sort(() => 0.5 - Math.random())

    return randoomFeaturedCourses.slice(0, 3)
  }
}
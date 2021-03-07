from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def get_name(self):
    return '{} {}'.format(self.first_name, self.last_name)
